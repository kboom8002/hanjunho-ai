import zipfile
import xml.etree.ElementTree as ET
import sys
import os
import glob

def extract_text(docx_filename):
    try:
        with zipfile.ZipFile(docx_filename) as z:
            xml_content = z.read('word/document.xml')
        
        tree = ET.fromstring(xml_content)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        paragraphs = []
        for p in tree.findall('.//w:p', namespaces=ns):
            texts = [node.text for node in p.findall('.//w:t', namespaces=ns) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
                
        return '\n'.join(paragraphs)
    except Exception as e:
        return f"Error reading {docx_filename}: {e}"

if __name__ == '__main__':
    if len(sys.argv) > 1:
        target_dir = sys.argv[1]
        for val in glob.glob(os.path.join(target_dir, "*.docx")):
            text = extract_text(val)
            out_name = val.replace(".docx", ".txt")
            with open(out_name, "w", encoding="utf-8") as f:
                f.write(text)
            print(f"Converted {val} to {out_name}")
    else:
        print("Usage: python docx_converter.py <directory>")
