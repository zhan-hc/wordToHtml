export const tempHtml = (html: string): string => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title></title>
    <style>
      html {background: white;color:black;height: 100%;}
      body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
        margin:0;padding:0;
      }
      body{padding:20px;line-height: 2; max-width: 1200px;margin: 0 auto;}
      h1{font-size:24px;font-weight: bold;}
      h2{font-size:20px;font-weight: bold;}
      h3{font-size:16px;font-weight: bold;}
      h4{font-size:16px;padding:10px 0;}
      ol,ul {list-style:none;}
      ol,ul,p,table{font-size:14px;}
      i{font-style: normal;}
      a:hover {text-decoration:none;}
      a,dt{-webkit-tap-highlight-color: transparent;-webkit-tap-highlight-color: transparent;}
      a:active {text-decoration:none;-webkit-tap-highlight-color: transparent;-webkit-tap-highlight-color: transparent;}
      ins,a {text-decoration:none;}
      .text-center{text-align: center;}
      .text-right{text-align: right;}
      .underline{text-decoration: underline;}
      table, th, td {border: 1px solid black;border-collapse: collapse; /* 移除单元格之间的间隔 */}
      td {padding: 0 10px;}
    </style>
  </head>
  <body>
      ${html}
  </body>
</html>
`