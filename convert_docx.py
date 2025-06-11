#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from pathlib import Path

# Проверяем установлена ли python-docx
try:
    from docx import Document
    print("python-docx library found")
except ImportError:
    print("Installing python-docx library...")
    os.system("pip install python-docx")
    try:
        from docx import Document
        print("python-docx library installed successfully")
    except ImportError:
        print("ERROR: Cannot install python-docx. Please install manually: pip install python-docx")
        sys.exit(1)

def extract_text_from_docx(docx_path):
    """Extract text from Word document"""
    try:
        doc = Document(docx_path)
        text_content = []
        
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text_content.append(paragraph.text.strip())
        
        return '\n'.join(text_content)
    except Exception as e:
        return f"ERROR reading document: {str(e)}"

def main():
    ecovery_path = Path("эковери")
    output_path = Path("товары_данные")
    
    # Create output directory
    output_path.mkdir(exist_ok=True)
    
    if not ecovery_path.exists():
        print(f"ERROR: Directory '{ecovery_path}' not found")
        return
    
    # Get all product folders
    product_folders = [f for f in ecovery_path.iterdir() if f.is_dir()]
    print(f"Found {len(product_folders)} product folders")
    
    processed_count = 0
    
    for folder in product_folders:
        product_name = folder.name
        print(f"Processing: {product_name}")
        
        # Find .docx files in the folder
        docx_files = list(folder.glob("*.docx"))
        
        if not docx_files:
            print(f"  WARNING: No .docx files found in {product_name}")
            
            # Create empty file for products without documents
            output_file = output_path / f"{product_name}.txt"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"Product: {product_name}\n")
                f.write("Price: NO DATA\n")
                f.write("Description: NO DATA\n")
                f.write("Status: Missing description file\n")
            
            processed_count += 1
            continue
        
        # Process the first .docx file
        docx_file = docx_files[0]
        print(f"  Converting: {docx_file.name}")
        
        try:
            # Extract text from document
            text_content = extract_text_from_docx(docx_file)
            
            # Create structured content
            output_file = output_path / f"{product_name}.txt"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"Product: {product_name}\n")
                f.write(f"Source file: {docx_file.name}\n")
                f.write("Content:\n")
                f.write(f"{text_content}\n")
            
            print(f"  ✓ Saved to: {output_file}")
            processed_count += 1
            
        except Exception as e:
            print(f"  ERROR processing {docx_file.name}: {str(e)}")
            
            # Create error file
            output_file = output_path / f"{product_name}.txt"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"Product: {product_name}\n")
                f.write(f"Source file: {docx_file.name}\n")
                f.write("Status: CONVERSION ERROR\n")
                f.write(f"Error: {str(e)}\n")
            
            processed_count += 1
    
    print("\n=== DONE ===")
    print(f"Total products processed: {processed_count}")
    print(f"Files saved to: {output_path}")
    
    # List created files
    txt_files = list(output_path.glob("*.txt"))
    print(f"\nCreated {len(txt_files)} files:")
    for txt_file in sorted(txt_files):
        print(f"  - {txt_file.name}")

if __name__ == "__main__":
    main() 