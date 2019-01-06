$(document).ready(()=>{
    $('.namez').click(()=>{
        $.get("http://localhost:3000/api/",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });







    $('#btnl').click(()=>{
        var text=$("#texta");
        var ids=$("#notice_id");
        var datas=text.val();
        var id=ids.val();
        console.log(datas);
        console.log(id);
        if(id=="")
            alert("enter the id!!!");
        else {if(datas==="                            ")
            alert("notice not inserted!!!");
            else{
                $.post(`http://localhost:3000/api/admin_notice?noticess=${datas}&&id=${id}`,(response,status)=>{
                    alert(response);
            });
            }}
    });

    $('#d_admin').click(()=>{
        var datas=$("#d1").val();
        $.post(`http://localhost:3000/api/del_admin_notice?id=${datas}`,(response,status)=>{
                alert(response);
        });
    });







    $('#b1').click(()=>{
        var datas=$("#u1").val();
        var password=$("#u2").val();
        $.post(`http://localhost:3000/api/add_user?reg_no=${datas}&&pwd=${password}`,(response,status)=>{
                alert(response);
        });

    });


    $('#b2').click(()=>{
        var datas=$("#u1").val();

        $.post(`http://localhost:3000/api/delete_user?reg_no=${datas}`,(response,status)=>{
                if(response==="0")
                    alert("error occured");
                else
                    alert("student deleted");
        });
    });




    $('#btnu').click(()=>{
        var datas=$("#textu").val();
        var id=$("#s_id").val();
        if(id=="")
            alert("insert notice slot!!!");
        else {
            if(datas==="                            "){
            alert("insert notice!!!");}
            else
           { $.post(`http://localhost:3000/api/student_notice?noticess=${datas}&&id=${id}`,(response,status)=>{
                alert(response);
        });}}
    });

    $('#d_student').click(()=>{
        var datas=$("#d2").val();
        $.post(`http://localhost:3000/api/del_student_notice?id=${datas}`,(response,status)=>{
                alert(response);
        });
    });

    $('.drop_student').click(()=>{
        $.get("http://localhost:3000/api/get_student_notice/",(data,status)=>{
                var bb='';
                for(let x=0;x<data.length;x++){
                    var aa=JSON.stringify(data[x].notice_id);
                    bb+=`<li><button class="btn btn-default" onclick='fun_student(${aa})' style="width:100%">${aa}</button></li>`;
                }
                document.querySelector(".bell_student").innerHTML=bb;



        });
    });




    $('.drop').click(()=>{
        $.get("http://localhost:3000/api/get_list/",(data,status)=>{
                var bb='';
                for(let x=0;x<data.length;x++){
                    var aa=JSON.stringify(data[x].notice_id);
                    bb+=`<li><button class="btn btn-default x${aa}" style="width:100%">${aa}</button></li>`;
                }
                document.querySelector(".bell").innerHTML=bb;

    $('.x1').click(()=>{
        $.post("http://localhost:3000/api/del_admin_notice?id=1",(data,status)=>{
            alert("notice deleted");
        });
    });

    $('.x2').click(()=>{
        $.post("http://localhost:3000/api/del_admin_notice?id=2",(data,status)=>{
            alert("notice deleted");
        });
    });

    $('.x3').click(()=>{
        $.post("http://localhost:3000/api/del_admin_notice?id=3",(data,status)=>{
            alert("notice deleted");
        });
    });

    $('.x4').click(()=>{
        $.post("http://localhost:3000/api/del_admin_notice?id=4",(data,status)=>{
            alert("notice deleted");
        });
    });

    $('.x5').click(()=>{
        $.post("http://localhost:3000/api/del_admin_notice?id=5",(data,status)=>{
            alert("notice deleted");
        });
    });

    $('.x6').click(()=>{
        $.post("http://localhost:3000/api/del_admin_notice?id=6",(data,status)=>{
            alert("notice deleted");
        });
    });


        });
    });


    $('.drops').click(()=>{
        $.get("http://localhost:3000/api/get_reg/",(data,status)=>{
                var bb='';
                for(let x=0;x<data.length;x++){
                    var aa=JSON.stringify(data[x].reg_no);
                    bb+=`<li><button class="btn btn-default" onclick='fun(${aa})'   style="width:100%">${aa}</button></li>`;
                }
                document.querySelector(".bells").innerHTML=bb;



        });
    });





    

    $('#n1').click(()=>{
        $.get("http://localhost:3000/api/notice_all?id=1",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#n2').click(()=>{
        $.get("http://localhost:3000/api/notice_all?id=2",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#n3').click(()=>{
        $.get("http://localhost:3000/api/notice_all?id=3",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#n4').click(()=>{
        $.get("http://localhost:3000/api/notice_all?id=4",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#n5').click(()=>{
        $.get("http://localhost:3000/api/notice_all?id=5",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#n6').click(()=>{
        $.get("http://localhost:3000/api/notice_all?id=6",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });



    $('#s1').click(()=>{
        $.get("http://localhost:3000/api/notice_all_student?id=1",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#s2').click(()=>{
        $.get("http://localhost:3000/api/notice_all_student?id=2",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#s3').click(()=>{
        $.get("http://localhost:3000/api/notice_all_student?id=3",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#s4').click(()=>{
        $.get("http://localhost:3000/api/notice_all_student?id=4",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#s5').click(()=>{
        $.get("http://localhost:3000/api/notice_all_student?id=5",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });

    $('#s6').click(()=>{
        $.get("http://localhost:3000/api/notice_all_student?id=6",(data,status)=>{
            $(".namez").css({'font-size':'50px'});
            document.querySelector('.namez').innerHTML=JSON.stringify(data);
        });
    });
});


