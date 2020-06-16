<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">


    <!-- Bootstrap Core CSS -->
    <link href="/resources/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="/resources/vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="/resources/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/resources/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<!-- daum 도로명 주소 찾기 api -->
	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	
	
</head>
<body>

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign Up</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" method='post' action="/join" id="usercheck" name="member">
                            <fieldset>
                                <div class="form-group">
                                	<label for="id">아이디</label>
                                    <input class="form-control" placeholder="ID" id="userId" name="userId" type="text" autofocus>
                                	<div class="check_font" id="id_check"></div>
                                </div>
                                <div class="form-group">
                                	<label for="pw">비밀번호</label>
                                    <input class="form-control" placeholder="Password" id="userPw" name="userPw" type="password" value="">
                               		<div class="check_font" id="pw_check"></div>
                                </div>
                                 <div class="form-group">
                                	<label for="pw2">비밀번호 확인</label>
                                    <input class="form-control" placeholder="Check Password" id="userPw2" name="userPw2" type="password" value="">
                                	<div class="check_font" id="pw2_check"></div>
                                </div>
                                <div class="form-group">
                                	<label for="name">이름</label>
                                    <input class="form-control" placeholder="Name" id="userName" name="userName" type="text" value="">
                                	<div class="check_font" id="name_check"></div>
                                </div>
                          
                                <div class="form-group">
                                    <label for="gender">성별</label>
                                    <input type="checkbox" id="userGender" name="userGender" value="남">남
                                    <input type="checkbox" id="userGender" name="userGender" value="여">여
                                </div>
                                
                                 <div class="form-group">
                                	<label for="birth">생년월일</label>
                                    <input class="form-control" placeholder="Birth" id="userBirth" name="userBirth" type="text" value="">
                                	<div class="check_font" id="birth_check"></div>
                                </div>
                                <div class="form-group">
                                	<label for="email">Email</label>
                                    <input class="form-control" placeholder="Email" id="userEmail" name="userEmail" type="E-mail" value="">
                                	<div class="check_font" id="email_check"></div>
                                </div>
                                <div class="form-group">
                                	<label for="phone">폰 번호</label>
                                    <input class="form-control" placeholder="phone number" id="userPhone" name="userPhone" type="text" value="">
                                	<div class="check_font" id="phone_check"></div>
                                </div>
                                <!-- 우편번호 검색  -->
                                <div class="form-group">
                                	<input class="form-control" sypte="width: 40%; display: inline;" placeholder="우편번호"
                                	name = "userPostcode" id="userPostcode" type="text" readonly="readonly">
                                	<button type="button" class="btn btn-success" onclick="searchPostCode();"><i class="fa fa-search"></i>우편번호 검색</button>
                                </div>
                                <!-- 도로명 주소 검색 -->
                                <div class="form-group">
                                	<input class="form-control" sypte="top: 5px;" placeholder="도로명 주소"
                                	name = "userAddress" id="userAddress" type="text" readonly="readonly">
                                	
                                </div>
                                
                                <div class="form-group text-center">
                                	<button type="submit" class="btn btn-primary">회원가입</button>
                                </div>    
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="/resources/vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/resources/vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="/resources/vendor/metisMenu/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="/resources/dist/js/sb-admin-2.js"></script>
    <script src= "/resources/js/join.js"></script>
    <script>
    	$(".btn-primary").on("click",function(e){
    		e.preventDefault();
    		$("form").submit();
    	});
    </script>
</body>
</html>