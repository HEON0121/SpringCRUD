console.log("바보");
var replyService = (function(){
	//등록
	function add(reply, callback, error){
		console.log("reply, callback, error");
	$.ajax({
		type : 'post',
		url : '/replies/new',
		data : JSON.stringify(reply),
		contentType : "application/json; charset=utf-8",
		success : function(result, status, xhr){
			if(callback) {
				callback(result);
			}
		},
		error : function(xhr, status, er) {
			if(error) {
				error(er);
			}
		}
	})
	};
	//댓글목록
	function getList(param, callback, error){
		console.log("getList");
		var bno = param.bno;
		var page = param.page || 1;
		
		$.getJSON("/replies/pages/" + bno + "/" + page + ".json",
				function(data) {
					if(callback) {
						// callback(data); // 댓글 목록만 가져오는 경우
						callback(data.replyCnt, data.list); //댓글 숫자 + 목록
					}
		}).fail(function(xhr, status, err) {
			if(error) {
				error();
			}
		});
	}
	//삭제처리
	function remove(rno, replyer, callback, error){
		$.ajax({
			type : 'delete',
			url : '/replies/' + rno,
			data : JSON.stringify({rno:rno, replyer:replyer}),
			contentType : "application/json; charset=utf-8",
			
			success : function(deleteResult, status, xhr){
		if(callback){
			callback(deleteResult);
		}
	},
	error : function(xhr, status, er){
		if(error){
			error(er);
			}
		}
	});
	}
	//댓글수정처리
	function update(reply, callback, error){
		console.log("RNO : " + reply.rno);
		$.ajax({
			type : 'put',
			url : '/replies/'+reply.rno,
			data : JSON.stringify(reply),
			contentType : "application/json; charset=utf-8",
			success : function(result, status, xhr){
				if(callback){
					callback(result);
				}
			},
			error : function(xhr, status, er){
				if(error){
					error(er);
				}
			}
		});
	}
	//댓글 조회처리
	function get(rno, callback, error){
		$.get("/replies/"+rno+".json", function(result){
			if(callback) {
				callback(result);
			}
		}).fail(function(xhr, status, err){
			if(error) {
				error();
			}
		});
	}
	// 시간 처리
	function displayTime(timeValue){
		var today = new Date();
		var gap = today.getTime() - timeValue;
		var dateObj = new Date(timeValue);
		var str = "";
		if(gap < (1000 * 60 * 60 * 24)){
			var hour = dateObj.getHours();
			var minute = dateObj.getMinutes();
			var second = dateObj.getSeconds();
			
			return [(hour > 9 ? '' : '0') + hour, ':', 
					(minute > 9 ? '' : '0') + minute, ':', 
					(second > 9 ? '' : '0') + second ].join('');
		} else {
			var year = dateObj.getFullYear();
			var month = dateObj.getMonth() + 1; 
			var date = dateObj.getDate();
			
			return [year, '/', (month > 9 ? '' : '0') + 
				    month, '/', (date > 9 ? '' : '0') + 
				    date].join('');
		}
	}
	return {
		add:add,
		getList:getList,
		remove:remove,
		update:update,
		get:get,
		displayTime:displayTime
	};
})();