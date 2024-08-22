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

const classArrs = ['text-center', 'text-right', 'underline']
const options = {
  styleMap: generateCombinations(classArrs).map(item => `p[style-name='${item}'] => p.${item.split(' ').join('.')}:fresh`),
  transformDocument: mammoth.transforms.paragraph(transformParagraph)
};

function transformParagraph(paragraph) {
  let styleName = "";
  
  if (paragraph.alignment === "center") {
    styleName = "text-center";
  } else if (paragraph.alignment === "right") {
    styleName = "text-right";
  }
  if (paragraph.children.some(item => item.isUnderline)) {
    styleName += `${styleName ? ' ' : ''}underline`
  }
  console.log(paragraph, 'ppp')
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

function generateCombinations(numbers) {
  // 创建一个新数组来存放结果
  let result = numbers.slice(); // 使用 slice 方法来复制原始数组的内容

  // 循环遍历数组中的每个数字
  for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
          // 将两个数字以空格分隔拼接成一个新的字符串
          let combined = numbers[i] + ' ' + numbers[j];
          // 添加到结果数组中
          result.push(combined);
      }
  }

  return result;
}