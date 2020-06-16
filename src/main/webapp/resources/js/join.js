/* 공백 체크 정규식 */
	var emp = /\s/g;
	/* 아이디 공백 체크 정규식 */
	var idEmp = /^[a-z0-9][a-z0-9_\-]{4,19}$/;
	/* 비밀번호 공백 체크 정규식 */
	var pwEmp = /^[A-Za-z0-9]{4,12}$/;
	/* 이름 정규식 */
	var nameEmp = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
	/*  이메일 정규식*/
	var mailEmp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	/* 휴대폰 번호 정규식 */
	var phoneEmp = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
	//생일
	var birthEmp = false;
	//주소
	var addresss = $('#userAddress');
	
	$('#userAddress').ready(function(){
		var address = $('#userAddress');
		
		//아이디 중복확인
		$('#userId').blur(function(){
			if($('#userId').val()==''){
				$('#id_check').text('아이디를 입력하세요.').css('color','red');
			}
			else if(idEmp.test($('#userId').val())!=true){
				$('#id_check').text('4~12자의 영문, 숫자만 가능합니다.').css('color','red');
			}else if($('#userId').val()!=''){
				var userId = $('#userId').val();
				$.ajax({
					async : true,
					type : 'post',
					data : userId,
					url : 'idcheck.do',
					dataType : 'json',
					contentType : 'application/json; charset=UTF-8',
					success : function(data){
						if(data.cnt>0){
							$('#id_check').text('중복된 아이디입니다.').css('color','red');
							$('#usercheck').attr("disabled",true);
						}else{
							if(idEmp.test(userId)){
								$('#id_check').text('사용 가능한 아이디입니다.').css('color','blue');
								$('#usercheck').attr("disabled", false);
							}else if(userId==''){
								$('#id_check').text('아이디를 입력해주세요.').css('color','red');
								$('#usercheck').attr("disabled",true);
							}else{
								$('#id_check').text('아이디는 숫자또는 소문자 4~12자리만 가능합니다. ').css('color','red');
								$('#usercheck').attr("disabled", true);
							}
						}
					}
					
				}); //ajax
			} 
		}); //blur
		// 회원가입 요청 폼 전송되었을때
		$('form').on('submit',function(){
			var inval_Arr = new Array(8).fill(false);
			if(idEmp.test($('#userId').val())){
				inval_Arr[0] = true;
			}else {
				inval_Arr[0]=false;
				alert('아이디를 확인하세요.');
				$('#userId').focus();
				return false;
			}
			//비밀번호가 같은 경우 & 비밀번호 정규식
			if(($('#userPw').val()==($('#userPw2').val()))
				&& pwEmp.test($('#userPw').val())){
				inval_Arr[1] = true;
				
			//아니면	
			}else {
				inval_Arr[1]=false;
				alert('비밀번호를 확인하세요.');
				$('#userPw').focus();
				return false;
			}
			//이름 입력 확인
			if(nameEmp.test($('#userName').val())){
				inval_Arr[2] = true;
			}else {
				inval_Arr[2]=false;
				alert('이름을 확인하세요.');
				$('#userName').focus();
				return false;
			}
			//성별 체크 확인
			if(member.userGender[0].checked==false
					&& 
			   member.userGender[1].checkd==false){
				inval_Arr[3] = false;
				alert('성별을 체크하세요.');
				return false;
			} else {
				inval_Arr[3] = true;
			}
			//생년월일 입력확인
			if(birthEmp){
				inval_Arr[4]=true;
			}else {
				inval_Arr[4]=false;
				alert('생년월일을 입력하세요.');
				$('#userBirth').focus();
				return false;
			}
			//Email 입력확인
			if(mailEmp.test($('#userEmail').val())){
				inval_Arr[5] = true;
			}else{
				inval_Arr[5] = false;
				alert('이메일을 확인하세요.');
				$('#userEmail').focus();
				return false;
			}
			//폰 번호 확인
			if(phoneEmp.test($('#userPhone').val())){
				inval_Arr[6] = true;
			}else{
				inval_Arr[6]=false;
				alert('휴대폰 번호를 확인하세요.');
				return false;
			}
			//주소확인
			if(address.val() == ''){
				inval_Arr[7] = false;
				alert('주소를 확안하세요.');
				return false;
			}else{
				inval_Arr[7] = true;
			}
			
			//전체 유효성 검사
			
			var validAll = true;
			
			for(var i=0; i< inval_Arr.length; i++){
				if(inval_Arr[i]==false){
					validAll == false;
				}
			}
			if(validAll == true){//유효성 모두 통과
				alert('회원 가입에 성공하셨습니다.');
			}else {
				alert('정보를 다시 확인하세요.');
			}	
		});
		
		
		$('#userId').blur(function(){
			if(idEmp.test($('#userId'))) {
				$('#id_check').text('');
			}else{
				$('#id_check').text('5~20자의 영문 소문자, 숫자와 특수기호(-),(_)만 사용 가능합니다.').css('color','red');
		
			}
		});
		$('#userPw').blur(function(){
			if(pwEmp.test($('#userPw').val())){
				$('#pw_check').text('');
			}else{
				$('#pw_check').text('4~12자의 숫자, 문자로만 사용 가능합니다.').css('color', 'red');
				
			}
		});
		//pw, pw2 비밀번호 일치확인 
		$('#userPw2').blur(function(){
			if($('#userPw').val() != $(this).val()){
				$('#pw2_check').text('비밀번호가 일치하지 않습니다.').css('color', 'red');
			}else{
				$('#pw2_check').text('');
			}
		});
		
		//이름에 특수문자 못넣게 설정
		$('#userName').blur(function(){
			if(nameEmp.test($(this).val())){
				$('#name_check').text('');
			} else {
				$('#name_check').text('한글 2~4자 이내로 입력하세요.(특수기호, 공백 사용 불가)').css('color', 'red');
			
			}
		});
		$('#userEmail').blur(function(){
			if(mailEmp.test($(this).val())){
				$('#email_chekc').text('');
			}else{
				$('#email_check').text('이메일 양식을 확인해주세요').css('color', 'red');
			}
		});
		
		//생일 유효성 검사
		
		var birthEmp = false;
		
		$('#userBirth').blur(function(){
			
			var birthday = $(this).val();
			
			var year = Number(birthday.substr(0,4)); //입력한 값의 0~4 자리까지 (년도)
			
			var month = Number(birthday.substr(4,2)); //입력한 값의 4번째 자리부터 2자리 숫자 (월)
			
			var day = Number(birthday.substr(6,2)); //입력한 값의 6번째 자리부터 2자리 숫자 (일)
			
			var today = new Date(); // 날짜 변수 선언
			
			var thisYear = today.getFullYear(); // 올해 연도
		
			
			if(birthday.length <=8){
				//1900년 이전 생과 지금 년도보다 크면 false반환
				if(year > thisYear || year < 1900){
					$('#birth_check').text('생년월일을 확인해주세요.').css('color','red');
				}
			
				else if (month < 1 || month > 12) {
					$('#birth_check').text('생년월일을 확인해주세요.').css('color','red');
					
				} 
				else if (day < 1 || day > 31) {
					('#birth_check').text('생년월일을 확인해주세요.').css('color','red');
				}

				else if ((month==4 || month==6 || month == 9 || month == 11)&&day==31){
					('#birth_check').text('생년월일을 확인해주세요.').css('color','red');
				}
				
				else if(month ==2){
					var isleap = (year % 4 == 0 && (year%100 != 0 || year % 400 == 0));
					
					if(day>29 || (day==29 && !isleap)){
						('#birth_check').text('생년월일을 확인해주세요.').css('color','red');
					}
					else {
						$('#birth_check').text('');
						birthEmp = true;
					}
					
				}
				
				else {
					$('#birth_check').text('');
					birthEmp = true;
				}//if문 끝!
			} else{
				//입력된 생년 월일이 8자 초과할 때
				('#birth_check').text('생년월일을 확인해주세요.').css('color','red');
			}
		}); //생일 유효성 검사 끝!
		
		// 폰번호 유효성 검사
		$('#userPhone').blur(function(){
			if(phoneEmp.test($(this).val())){
				$('#phone_check').text('');
			}else{
				('#phone_check').text('생년월일을 확인해주세요.').css('color','red');
			}
		});
	}); // $('userAddress').ready(function){}
	
	//우편번호 검색 버튼 클릭이벤트
	
	function searchPostCode(){
		new daum.Postcode({
			oncomplete: function(data){
				var fullRoadAddr = data.roadAddress; // 도로명 주소
				var extraRoadAddr = ''; //도로명 조합형 주소 변수
				
				//법정동의 경우 마지막 문자가 "동/로/가"로 끝남
				if(data.bname !== '' 
					&& /[동|로|가]$/g.test(data.bname)){
						extraRoadAddr += data.bname;
				}
				//건물명이 있고, 공동주택일 경우
				if(data.buildingName !== ''
					&& data.apartment === 'Y'){
					extraRoadAddr += (extraRoadAddr !== '' ? ', '
							+ data.buildingName : data.buildingName);
				}
				//도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열 
				if(extraRoadAddr !== ''){
					extraRoadAddr = ' (' + extraRoadAddr + ')';
				}
				//도로명, 지번 주소의 유무에 따라 해당 조합형 주소 추가
				if(fullRoadAddr !== ''){
					fullRoadAddr += extraRoadAddr;
				}
				
				//우폄번호와 주소정보를 해당 필드에 넣기
				$('[name=userPostcode]').val(data.zonecode);
				$('[name=userAddress]').val(fullRoadAddr);
				
				document.getElementById('userPostcode').value = data.zonecode; // 5자리 새우편번호
				document.getElementById('userAddress').value = fullRoadAddr;
			}
		}).open();
	}