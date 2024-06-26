import mammoth from 'mammoth'
import fs from 'fs'

// 获取命令行参数
const args = process.argv.slice(2);

// 检查是否提供了路径参数
if (args.length === 0) {
    console.error('请提供文件路径作为参数');
    process.exit(1);
}

const filePath = args[0];


const options = {
  styleMap: [
    "p[style-name='text-center'] => p.text-center:fresh",
    "p[style-name='text-right'] => p.text-right:fresh"
  ],
  transformDocument: mammoth.transforms.paragraph(transformParagraph)
};

function transformParagraph(paragraph) {
  let styleName = "";
  
  if (paragraph.alignment === "center") {
    styleName = "text-center";
  } else if (paragraph.alignment === "right") {
    styleName = "text-right";
  }
  
  return {
      ...paragraph,
      styleName
  };
}

mammoth.convertToHtml({ path: filePath }, options).then(function(result){
  const html = result.value;
  const tempHtml = fs.readFileSync('./temp.html', 'utf8')
  const insertTag = '<body>'
  const insertIndex = tempHtml.lastIndexOf(insertTag) + insertTag.length
  const resHtml = tempHtml.slice(0, insertIndex) + html + tempHtml.slice(insertIndex)
  fs.writeFileSync('./output.html', resHtml, 'utf8')
}).catch(function(err){
  console.log(err);
});
