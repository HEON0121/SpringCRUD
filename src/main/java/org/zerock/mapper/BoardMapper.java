package org.zerock.mapper;

import java.util.List;


import org.zerock.domain.BoardVO;
import org.zerock.domain.Criteria;
import org.zerock.domain.MemberVO;

public interface BoardMapper {
//	@Select("select * from tb1_board where bno > 0")
	public List<BoardVO> getList();
	//����¡
	public List<BoardVO> getListWithPaging(Criteria cri);
	
	public void insert(BoardVO board);

	public Integer insertSelectKey(BoardVO board);
	
	public BoardVO read(Long bno);
	
	public int delete(Long bno);
	
	public int update(BoardVO board);
	
	//����
	public int getTotalCount(Criteria cri);
	
	//����¡
	
	//ȸ������
	public void join(MemberVO member);
}
