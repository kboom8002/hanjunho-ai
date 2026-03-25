import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def extract_text(docx_filename):
    try:
        if not os.path.exists(docx_filename):
            return f"Error: File not found {docx_filename}"
            
        with zipfile.ZipFile(docx_filename) as z:
            xml_content = z.read('word/document.xml')
        
        tree = ET.fromstring(xml_content)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        paragraphs = []
        for p in tree.findall('.//w:p', namespaces=ns):
            # Check for header styles or list items to make it slightly more readable
            # but for now just extracting text is fine.
            texts = [node.text for node in p.findall('.//w:t', namespaces=ns) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
                
        return '\n'.join(paragraphs)
    except Exception as e:
        return f"Error reading {docx_filename}: {e}"

if __name__ == '__main__':
    if len(sys.argv) > 1:
        print(extract_text(sys.argv[1]))
    else:
        print("Usage: python docx_reader.py <file.docx>")
