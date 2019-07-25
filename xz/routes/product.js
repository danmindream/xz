const express=require('express')
const pool=require('../pool.js')
var router=express.Router()

router.get('/list',function(req,res)
	{
		var obj=req.query
		console.log(obj)
		if (!obj.npo)
		{
			obj.npo=1
		}
		if (!obj.size)
		{
			obj.size=3
		}
		start=parseInt(obj.npo-1)*obj.size
		count=parseInt(obj.size)
		pool.query('SELECT lid,title,price FROM xz_laptop limit ?,?',[start,count],function(err,result){
			if(err)throw err
			res.send(result)
		})
	})

router.post('/add',function(req,res)
	{
		var obj=req.body
		//console.log(obj)
		var i=400
		for(var key in obj){
			i++
			if (obj[key]==='')
			{
				
				res.send({code:i,msg:key+' required'})
				return
				
			}
		}
		pool.query('INSERT INTO xz_laptop SET ?',[obj],function(err,result){
			if(err)throw err
			res.send({code:200,msg:'add suc'})
		})

		
	})









module.exports=router