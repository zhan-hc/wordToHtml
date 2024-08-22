<script setup lang="ts">
import mammoth from 'mammoth'
import { tempHtml, textToBlob } from './utils/common'
import { Github } from '@janus-c/icons-vue'

const classArrs = ['text-center', 'text-right', 'underline']
const options = {
  styleMap: generateCombinations(classArrs).map(item => `p[style-name='${item}'] => p.${item.split(' ').join('.')}:fresh`),
  transformDocument: mammoth.transforms.paragraph(transformParagraph)
};

function transformParagraph(paragraph) {
  let styleName = ""
  
  if (paragraph.alignment === "center") {
    styleName = "text-center"
  } else if (paragraph.alignment === "right") {
    styleName = "text-right"
  }
  if (paragraph.children.some(item => item.isUnderline)) {
    styleName += `${styleName ? ' ' : ''}underline`
  }
  
  return {
      ...paragraph,
      styleName
  }
}

const coverToHtml = (arrayBuffer: ArrayBuffer) => {
  mammoth.convertToHtml({ arrayBuffer }, options).then(res => {
    const url = window.URL.createObjectURL(new Blob([tempHtml(res.value)], {type: 'text/plain'}))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', "index.html")
    document.body.appendChild(link)
    link.click()
  }).catch(err => {
    console.error(err)
  })
}

const fileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files[0]
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = function(e) {
    var arrayBuffer = e.target.result as ArrayBuffer
    coverToHtml(arrayBuffer)
  }

  reader.onerror = function(e) {
    console.error("File could not be read! Code " + e.target.error)
  }
}

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

const handleHref = () => {
  window.open('https://github.com/zhan-hc/wordToHtml')
}
</script>

<template>
  <h1>word转html</h1>
  <div class="icon-box" @click="handleHref">
    <Github />
  </div>
  <p>选择word文档，解析完成会下载转换之后的html</p>
  <p>适用场景</p>
  <ul>
    <li>简单的word的文档转html（简单政策协议转html 拿来即用）</li>
  </ul>
  <div class="upload-container">
    <input type="file" id="fileInput" class="file-input" accept=".doc,.docx" @change="fileChange"/>
    <label for="fileInput" class="file-label">
      <span>选择文件</span>
      <font-awesome-icon icon="fal fa-upload" />
    </label>
  </div>
</template>

<style scoped>
.upload-container {
  position: relative;
  display: inline-block;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  padding: 6px 12px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
.icon-box {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.file-input {
  opacity: 0; /* 让输入框透明不可见 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: inherit; /* 继承容器的光标样式 */
}

.file-label {
  display: flex;
  align-items: center;
  gap: 5px; /* 控制图标与文字间距 */
  color: #333;
  font-size: 14px;
}

.fa-upload {
  font-size: 18px;
  color: #3cb371; /* 图标颜色，可以根据需要调整 */
}
</style>
