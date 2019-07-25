const express=require('express')
const pool=require('../pool.js')
var router=express.Router()
//添加路由
//1.用户注册

router.post('/reg',function(req,res)
	{
	var obj=req.body
	console.log(obj)
	//验证数据是否为空
	if(!obj.uname){
		res.send({code:401,msg:'uname required'})
			//注册成功
			return
	}else if (!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'})
			return
	}else if (!obj.email)
	{
		res.send({code:403,msg:'email required'})
			return
	}else if (!obj.phone)
	{
		res.send({code:404,msg:'phone required'})
			return
	}
	//执行sql语句
	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
			if(err)throw err
			console.log(result)
	})
		//如果注册成功
		
	res.send(`
		code:200
		<br>
		msg:'register suc'
	`)
	})

//用户登录
router.post('/login',function(req,res)
	{
	//获取数据
	var obj=req.body
	console.log(obj)
	//验证数据是否为空
	if (!obj.uname)
	{
		res.send({code:401,msg:'uname required'})
			return
	}
	if (!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'})
			return
	}	
		//执行SQL语句
		//查找用户和密码同时满足的数据
		pool.query('SELECT*FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
			if(err)throw err
			console.log(result)
			//判断
			if(result.length>0){
				res.send({code:200,msg:'register suc'})
			}else
				res.send({code:301,msg:'login err'})

		})
		
	})
//用户查询
router.get('/detail',function(req,res)
	{
		var obj=req.query
		console.log(obj)
		if(!obj.uid){
			res.send({code:401,msg:'uid required'})
				return
		}
	pool.query('SELECT*FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
		if(err)throw err
		//console.log(result)
		if(result.length>0){
		res.send(result[0])
		}else{
		res.send({code:301,msg:'can not found'})
		}
	})

	})
//用户修改
router.get('/update',function(req,res)
	{
		var obj=req.query
		console.log(obj)
		var i=400
		for (var key in obj)
		{
			i++
			if(!obj[key]){
			res.send({code:i,msg:key+'required'})
				return
			}
		}
	pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
			if(err)throw err
				//console.log(result)
			if(result.affectedRows>0){
			res.send({code:200,msg:'update suc'})
				return
			}else{
			res.send({code:301,msg:'update err'})
			}
	})
	})
//用户列表
router.get('/list',function(req,res)
	{
		var obj=req.query
		//console.log(obj)
		if(!obj.pno){
			obj.pno=1
		}
		if(!obj.size){
			obj.size=3
		}
		start=parseInt((obj.pno-1)*obj.size)
		count=parseInt(obj.size)
	pool.query('SELECT*FROM xz_user limit ?,?',[start,count],function(err,result){
			if(err)throw err
			res.send({code:200,msg:result})
		})

	})

router.get('/delete',function(req,res)
	{
		var obj=req.query
		console.log(obj)
		if(!obj.uid)
		{
			res.send({code:401,msg:'uid required'})
				return
		}
		pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result)
		{
			if(err)throw err
			if (result.affectedRows>0)
			{
				res.send({code:200,msg:'register suc'})
			}else{
				res.send({code:301,msg:'delete err'})
				}
		})
	})






router.post('/login1',function(req,res)
	{
	//获取数据
	var obj=req.body
	console.log(obj)
	//验证数据是否为空
	if (!obj.uname)
	{
		res.send({code:401,msg:'uname required'})
			return
	}
	if (!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'})
			return
	}	
		//执行SQL语句
		//查找用户和密码同时满足的数据
		pool.query('SELECT*FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result){
			if(err)throw err
			console.log(result)
			//判断
			if(result.length>0){
				res.send({code:200,msg:'register suc'})
			}else
				res.send({code:301,msg:'login err'})

		})
		
	})
//导出路由器对象
module.exports=router