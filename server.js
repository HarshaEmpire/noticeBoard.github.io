const express=require("express");
const mysql=require("mysql");
const cookie=require("cookie-parser");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookie())
app.use(express.static(__dirname + "/"));
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database:"notice"
});
db.connect((err)=>{
    if(err){
        throw err;
        return;
    }
    console.log("mysql connected");
});

app.get('/',(req,res)=>{
    res.sendFile((__dirname +"./index.html"));
});
app.get('/api/',(req,res)=>{
    var sql = "select notice_info from notices where notice_id=1";
    db.query(sql,(err,rows,fields)=>{
    if(err){
            console.log(err);
    }
    else{
        console.log("success");
        console.log(rows);
        res.send(((rows[0].notice_info)));
    }
    });

});

app.get('/api/notice_all/',(req,res)=>{
    var sql = "select notice_info from notices where notice_id=?";
    db.query(sql,[req.query.id],(err,rows,fields)=>{
    if(err || rows.length===0){
            res.send(("notice is not available"));
    }
    else{
        console.log("success");
        console.log(rows);
        res.send(((rows[0].notice_info)));
    }
    });

});


app.get('/api/notice_all_student/',(req,res)=>{
    var sql = "select notice_info from student_notice where notice_id=?";
    db.query(sql,[req.query.id],(err,rows,fields)=>{
    if(err || rows.length===0){
            res.send(("notice is not available"));
    }
    else{
        console.log("success");
        console.log(rows);
        res.send(((rows[0].notice_info)));
    }
    });

});


function isAdmin(req,res,next){
    const regNum = req.cookies.admin;
    //check this regum sql query


    if(regNum!="2017408"){
        res.redirect("http://localhost:3000/admin/");
    }
    next();
}

function isuser(req,res,next){
    const regNum = req.cookies.user;
    //check this regum sql query


    if(regNum!="20174088"){
        res.redirect("http://localhost:3000/student/");
    }
    next();
}

app.post("/admin",(req,res)=>{
    const regNum = req.body.regNum;
    const pwd = req.body.password;
    var sql="Select * from admin where reg_no=? and password=?";
    console.log(regNum);
    db.query(sql,[(regNum),pwd],(err,rows,fields)=>{
        if(rows.length===0){
            res.redirect("http://localhost:3000/admin/");
        }
        else{
            console.log(rows);
            res.cookie("admin","2017408");
            res.redirect("http://localhost:3000/adminpage/");
        }
    });
    

});



app.post('/api/admin_notice/',(req,res)=>{
    var aa=req.query.noticess;
    var bb=req.query.id;
    if(bb>6)
        res.send("choose slot less than 7");
    else{
    var sql="insert into notices (notice_id,notice_info) values (?,?)";
    db.query(sql,[bb,aa],(err,rows,fields)=>{
        if(err)
            res.send("slot already occupied");
        else
            res.send("notice updated");
    });
    }
    
});

app.post('/api/del_admin_notice/',(req,res)=>{
    var bb=req.query.id;
    var sql="delete from notices where notice_id=?";
    db.query(sql,[bb],(err,rows,fields)=>{
        console.log(rows);
        if(err)
            res.send("notice doesnt exist");
        else
            res.send("notice deleted");
    });
    
});

app.get('/api/get_list/',(req,res)=>{
    var sql="select notice_id from notices";
    db.query(sql,(err,rows,fields)=>{
        console.log(rows);
        res.send(rows)
    });
});

app.get('/api/get_reg/',(req,res)=>{
    var sql="select reg_no from users";
    db.query(sql,(err,rows,fields)=>{
        res.send(rows);
    });
});






app.post("/student",(req,res)=>{
    const regNum = req.body.reg_no;
    const pwd = req.body.password;
    var sql="Select * from users where reg_no=? and password=?";
    db.query(sql,[(regNum),pwd],(err,rows,fields)=>{
        if(rows.length===0){
            res.redirect("http://localhost:3000/student/");
        }
        else{
            console.log(rows);
            res.cookie("user","20174088");
            console.log(rows);
            res.redirect("http://localhost:3000/student_login/");
        }
    });
    

});

app.post('/api/student_notice/',(req,res)=>{
    var aa=req.query.noticess;
    var bb=req.query.id;
    console.log(req.query.noticess);
    if(bb>6)
        res.send("choose slot less than 7");
    else{
    var sql="insert into student_notice (notice_id,notice_info) values (?,?)";
    db.query(sql,[bb,aa],(err,rows,fields)=>{
        if(err)
            res.send("notice already exist");
        else
            res.send("notice updated");
    });
}
    
});









app.post('/api/del_student_notice/',(req,res)=>{
    var bb=req.query.id;
    var sql="delete from student_notice where notice_id=?";
    db.query(sql,[bb],(err,rows,fields)=>{
        if(err)
            res.send("notice doesnt exist");
        else
            res.send("notice deleted");
    });
    
});


app.post("/api/add_user/",(req,res)=>{
    var aa=req.query.reg_no;
    var bb=req.query.pwd;
    if (bb.length<8)
        res.send("minimum size should be 8");
    else{
    var sql="insert into users (reg_no,password) values(?,?)";
    db.query(sql,[aa,bb],(err,row,fields)=>{
        res.send("user added");
    });}
});

app.post("/api/delete_user/",(req,res)=>{
    var aa=req.query.reg_no;
    console.log(aa);
    var sql="select * from users where reg_no=?";
    db.query(sql,[aa],(err,rows,fields)=>{
        if(err || rows.length===0)
            res.send("0");
    });
    var sql1="delete from users where reg_no=?";
    db.query(sql1,[aa],(err,rows,fields)=>{
        res.send("1");
    });
});


app.get("/api/loading/",(req,res)=>{
    var sql="select notice_id from notices";
    db.query(sql,(err,rows,fields)=>{
        console.log(rows);
        res.send(rows);
    });
});




app.get('/admin/',(req,res)=>{
    res.sendFile((__dirname +"/admin.html"));
});
app.get('/adminpage/',isAdmin,(req,res)=>{
    res.cookie("admin",20174085);
    res.sendFile((__dirname +"/adminpage.html"));
});

app.get('/student_login/',isuser,(req,res)=>{
    res.cookie("user",20174085);
    res.sendFile((__dirname +"/student_login.html"));
});

app.get('/student/',(req,res)=>{
    res.sendFile((__dirname +"/login.html"));
});

app.get('/student_page/',(req,res)=>{
    res.sendFile((__dirname + "/student_notice.html"));
});


app.get('/api/get_student_notice/',(req,res)=>{
    var sql="select notice_id from student_notice";
    db.query(sql,(err,rows,fields)=>{
        console.log(rows);
        res.send(rows)
    });
});




app.get("/api/loading_student/",(req,res)=>{
    var sql="select notice_id from student_notice";
    db.query(sql,(err,rows,fields)=>{
        console.log(rows);
        res.send(rows);
    });
});


const port=process.env.port || 3000 ;
app.listen(port,()=>{
    console.log(`listening${port}`);
});



