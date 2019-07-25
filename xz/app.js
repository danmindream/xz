const express=require('express')
const bodyParser=require('body-parser')
const userRouter=require('./routes/user.js')
const productRouter=require('./routes/product.js')
var app=express()
app.listen(8080)

//使用body-parser 中间件，将post请求的数据解析为对象

app.use(bodyParser.urlencoded({
	extended:false
}))

app.use(express.static('./public'))
//使用路由器，挂载到/user下  /user/reg
app.use('/user',userRouter)
app.use('/product',productRouter)






