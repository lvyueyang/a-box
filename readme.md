# a-box 自适应弹出层原生js插件  

## 使用方法  
```html
<link rel="stylesheet" href="./lib/common.css">
<script src="./lib/a-box.js"></script>
```
```js
const box = new ABox()
box.alert({
    title: '提示',
    content: '这是一个 alert 弹出层',
    confirm: () => {
        console.log('确定')
    }
})
```
## 对话框  
### alert  
```js
box.alert({
    title: '提示',
    content: '这是一个 alert 弹出层',
    confirm: () => {
        console.log('确定')
    }
})
```
### confirm  
```js
box.confirm({
    title: '提示',
    content: '这是一个 confirm 弹出层',
    confirm: () => {
        console.log('确定')
    },
    cancel: () => {
        console.log('取消')
    }
})
```
### prompt  
```js
 box.prompt({
    title: '提示',
    type: '',
    confirm: (content) => {
        console.log(content)
        console.log('确定')
    },
    cancel: () => {
        console.log('取消')
    }
})
```

### message  
```js
box.message({
    content: '一个消息',
    type,
    close: () => {
        console.log('close')
    }
})
```

### loading  
```js
const loading = box.loading({
    content: '这是一个loading', 
    mask: true
})
setTimeout(() => {
    loading.setContent('变换内容 2s 后关闭')
    setTimeout(() => {
        loading.hide()
    }, 2000)
}, 2000)
```
### 局部loading  
```html
<div class="demo-1" id="Demo1">局部内容</div>
```
```js
const loading = box.loading({
    selector: document.querySelector('#Demo1'),
    content: '这是一个loading', 
    mask: true
})
setTimeout(() => {
   loading.hide()
}, 2000)
```
### notice  
```js
box.notice({
    title: '这是一个标题',
    content: '这是内容，这是内容，这是内容这是内容这是内容',
    type,
    close: () => {
        console.log('close')
    }
})
```
