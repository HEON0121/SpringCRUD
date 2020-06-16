<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>    
<%@include file="../includes/header.jsp" %>

   
	
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">게시판</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Board List Page
                           <button type="button" id="regBtn" class="btn btn-xs pull-right" >Register New Board</button>
                            <!-- <sec:authentication property="principal" var="pinfo"/>
                            	<sec:authorize access="isAuthenticated()">
                            		<c:if test="${pinfo.username eq board.writer }">
                            			<button data-oper='register' class="btn btn-default">Register New Board</button>
                            		</c:if>
                            	</sec:authorize>	 -->
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>#번호</th>
                                        <th>제목</th>
                                        <th>작성자</th>
                                        <th>작성일</th>
                                        <th>수정일</th>
                                    </tr>
                                </thead>
                            <tbody>    
                          	<c:forEach items="${list}" var="board">
                          			<tr>
                          				<td><c:out value="${board.bno}"/></td>
                          				<td>
                          				<a class='move' href='<c:out value="${board.bno}"/>'>
                          				<c:out value="${board.title}"/></a></td>
                          				<td><c:out value="${board.writer}"/></td>
                          				<td><fmt:formatDate pattern="yyyy-MM-dd" value="${board.regdate}"/></td>
                          				<td><fmt:formatDate pattern="yyyy-MM-dd" value="${board.updateDate}"/></td>
                          			</tr>	
                          	</c:forEach>
                          	</tbody>
                            </table>
                      		
                      		
                      		<div class='row'>
                      			<div class="col-lg-12">
                      			<form id='searchForm' action="/board/list" method='get'>
                      				<select name='type'>
                      					<option value="">--</option>
                      					<option value="T">제목</option>
                      					<option value="C">내용</option>
                      					<option value="W">작성자</option>
                      					<option value="TC">제목 or 내용</option>
                      					<option value="TW">제목 or 작성자</option>
                      					<option value="TWC">제목 or 내용 or 작성자</option>
                      				</select>
                      				<input type = 'text' name='keyword'/>
                      				<input type = 'hidden' name='pageNum' value='${pageMaker.cri.pageNum}'/>
                      				<input type = 'hidden' name='amount' value='${pageMaker.cri.amount }'/>
                      				<button class='btn btn-default'>Search</button>
                      			</form>
                      			</div>
                      		</div>
                      		
                      		<div class='pull-right'>
                      			<ul class="pagination">
                      				<c:if test = "${pageMaker.prev}">
                      					<li class = "paginate_button previous">
                      					<a href="${pageMaker.startPage - 1 }">Previous</a>
                      					</li>
                      				</c:if>
                      				
                      				<c:forEach var="num" begin="${pageMaker.startPage}"
                      					end = "${pageMaker.endPage}">
                      					<li class="paginate_button ${pageMaker.cri.pageNum == num ? "active":""} ">                      					
                      					<a href="${num}">${num}</a>
                      					</li>
                      				</c:forEach>
                      				
                      				<c:if test="${pageMaker.next}">
                      					<li class="paginate_button next">
                      					<a href="${pageMaker.endPage + 1}">Next</a>
                      					</li>
                      				</c:if>
                      			</ul>
                      		</div>
                      		
                      		<!-- end Pagination -->
                       </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
           
             <!--   Modal 추가 -->
                          <div class="modal fade" id = "myModal" tabindex = "-1" role="dialog"
                          	aria-labelledby="myModalLabel" aria-hidden="true">
                          	<div class="modal-dialog">
                          		<div class="modal-content">
                          			<div class="modal-header">
                          				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                          					&times;
                          				</button>
                          				<h4 class="modal-title" id="myModalLabel">Modal title</h4>
                          			</div>
                          			<div class="modal-body">
                          				처리가 완료되었습니다.
                          			</div>
                          			<div class="modal-footer">
                          				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                          				<button type="button" class="btn btn-primary">Save changes</button>
                          			</div>
                          		</div>
                          		<!-- /.modal-content  -->
                          	</div>
                          	<!-- /.modal-dialog  -->
                          </div>
           				  <!--  /.modal  -->
           	
           				   <!-- 페이징 자바스크립트 전처리 -->
            			<form id = 'actionForm' action="/board/list" method = 'get'>
            				<input type='hidden' name='pageNum' value='${pageMaker.cri.pageNum}'>
            				<input type='hidden' name='amount' value='${pageMaker.cri.amount}'>
            			</form>
           				  
    
            <%@include file="../includes/footer.jsp" %>
            
      			 <!-- 등록 버튼 눌렀을 시 이벤트 처리 -->
	<!-- 모달 창 보여주기 -->
	<script>
	$(document).ready(function(){
		
		var result = '<c:out value="${result}"/>';
		
		checkModal(result);
		
		history.replaceState({},null,null);
		
		function checkModal(result) {
			
			if(result === '' || history.state){return;}
			
			if(parseInt(result) > 0){
				$(".modal-body").html("게시글 "+ parseInt(result) + " 번이 등록되었습니다.");
				alert(result);
				}
			
			$("#myModal").modal("show");
		}
		
		$("#regBtn").on("click", function(){
			self.location = "/board/register";
		});
		
		var actionForm = $("#actionForm");
		
		$(".paginate_button a").on("click", function(e){
			
			e.preventDefault();
			
			console.log('click');
			
			actionForm.find("input[name='pageNum']").val($(this).attr("href"));
			actionForm.submit();
		});
		// 게시물 조회위한 이벤트 처리 
		$(".move").on("click",function(e){
			//alert("dd")
			e.preventDefault();
			actionForm.append("<input type='hidden' name='bno' value='"+$(this).attr("href")+"'>");
			actionForm.attr("action","/board/get");
			actionForm.submit();
		});
		
	});
	</script>

   
   
	
	
