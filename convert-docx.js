const fs = require('fs');
const path = require('path');

// Проверяем и устанавливаем библиотеку mammoth
let mammoth;
try {
    mammoth = require('mammoth');
    console.log('mammoth library found');
} catch (error) {
    console.log('Installing mammoth library...');
    const { execSync } = require('child_process');
    
    try {
        execSync('npm install mammoth', { stdio: 'inherit' });
        mammoth = require('mammoth');
        console.log('mammoth library installed successfully');
    } catch (installError) {
        console.error('ERROR: Cannot install mammoth. Please install manually: npm install mammoth');
        process.exit(1);
    }
}

async function extractTextFromDocx(docxPath) {
    try {
        const result = await mammoth.extractRawText({ path: docxPath });
        return result.value.trim();
    } catch (error) {
        return `ERROR reading document: ${error.message}`;
    }
}

async function main() {
    const ecoveryPath = 'эковери';
    const outputPath = 'товары_данные';
    
    // Создаем папку для результатов
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    
    if (!fs.existsSync(ecoveryPath)) {
        console.error(`ERROR: Directory '${ecoveryPath}' not found`);
        return;
    }
    
    // Получаем все папки товаров
    const productFolders = fs.readdirSync(ecoveryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    console.log(`Found ${productFolders.length} product folders`);
    
    let processedCount = 0;
    
    for (const productName of productFolders) {
        console.log(`Processing: ${productName}`);
        
        const productPath = path.join(ecoveryPath, productName);
        
        // Ищем .docx файлы в папке товара
        const files = fs.readdirSync(productPath);
        const docxFiles = files.filter(file => file.endsWith('.docx'));
        
        if (docxFiles.length === 0) {
            console.log(`  WARNING: No .docx files found in ${productName}`);
            
            // Создаем пустой файл для товара без документа
            const outputFile = path.join(outputPath, `${productName}.txt`);
            const emptyContent = [
                `Product: ${productName}`,
                `Price: NO DATA`,
                `Description: NO DATA`,
                `Status: Missing description file`
            ].join('\n');
            
            fs.writeFileSync(outputFile, emptyContent, 'utf8');
            processedCount++;
            continue;
        }
        
        // Обрабатываем первый .docx файл
        const docxFile = docxFiles[0];
        console.log(`  Converting: ${docxFile}`);
        
        try {
            const docxPath = path.join(productPath, docxFile);
            
            // Извлекаем текст из документа
            const textContent = await extractTextFromDocx(docxPath);
            
            // Создаем структурированный контент
            const outputFile = path.join(outputPath, `${productName}.txt`);
            const structuredContent = [
                `Product: ${productName}`,
                `Source file: ${docxFile}`,
                `Content:`,
                textContent
            ].join('\n');
            
            fs.writeFileSync(outputFile, structuredContent, 'utf8');
            
            console.log(`  ✓ Saved to: ${outputFile}`);
            processedCount++;
            
        } catch (error) {
            console.error(`  ERROR processing ${docxFile}: ${error.message}`);
            
            // Создаем файл с ошибкой
            const outputFile = path.join(outputPath, `${productName}.txt`);
            const errorContent = [
                `Product: ${productName}`,
                `Source file: ${docxFile}`,
                `Status: CONVERSION ERROR`,
                `Error: ${error.message}`
            ].join('\n');
            
            fs.writeFileSync(outputFile, errorContent, 'utf8');
            processedCount++;
        }
    }
    
    console.log('\n=== DONE ===');
    console.log(`Total products processed: ${processedCount}`);
    console.log(`Files saved to: ${outputPath}`);
    
    // Показываем список созданных файлов
    const txtFiles = fs.readdirSync(outputPath)
        .filter(file => file.endsWith('.txt'))
        .sort();
    
    console.log(`\nCreated ${txtFiles.length} files:`);
    txtFiles.forEach(file => {
        console.log(`  - ${file}`);
    });
}

// Запускаем скрипт
main().catch(error => {
    console.error('Script error:', error);
    process.exit(1);
});