# Convert all .docx files from ecovery folder to .txt files

$outputDir = "товары_данные"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    Write-Host "Word application started successfully"
} catch {
    Write-Error "Cannot start Word. Make sure Microsoft Word is installed."
    exit 1
}

$productFolders = Get-ChildItem -Path "эковери" -Directory
Write-Host "Found product folders: $($productFolders.Count)"

foreach ($folder in $productFolders) {
    $productName = $folder.Name
    Write-Host "Processing product: $productName"
    
    $docxFiles = Get-ChildItem -Path $folder.FullName -Filter "*.docx"
    
    if ($docxFiles.Count -eq 0) {
        Write-Warning "No .docx files found in folder '$productName'"
        
        $emptyContent = "Product: $productName`nPrice: NO DATA`nDescription: NO DATA`nStatus: Missing description file"
        $emptyContent | Out-File -FilePath "$outputDir\$productName.txt" -Encoding UTF8
        continue
    }
    
    $docxFile = $docxFiles[0]
    Write-Host "  Converting file: $($docxFile.Name)"
    
    try {
        $doc = $word.Documents.Open($docxFile.FullName)
        $text = $doc.Content.Text
        
        $structuredContent = "Product: $productName`nSource file: $($docxFile.Name)`nContent:`n$text"
        
        $outputFile = "$outputDir\$productName.txt"
        $structuredContent | Out-File -FilePath $outputFile -Encoding UTF8
        
        Write-Host "  Saved to: $outputFile"
        $doc.Close()
        
    } catch {
        Write-Error "Error processing file $($docxFile.Name): $($_.Exception.Message)"
        
        $errorContent = "Product: $productName`nSource file: $($docxFile.Name)`nStatus: CONVERSION ERROR`nError: $($_.Exception.Message)"
        $errorContent | Out-File -FilePath "$outputDir\$productName.txt" -Encoding UTF8
    }
}

$word.quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
Remove-Variable word

Write-Host "DONE - All files converted to folder: $outputDir"
Write-Host "Total products processed: $($productFolders.Count)"

Write-Host "Created files:"
Get-ChildItem -Path $outputDir -Filter "*.txt" | ForEach-Object {
    Write-Host "  - $($_.Name)"
} 