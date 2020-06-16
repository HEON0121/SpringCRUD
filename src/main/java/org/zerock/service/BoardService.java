package org.zerock.service;

import java.util.List;

import org.zerock.domain.BoardVO;
import org.zerock.domain.Criteria;
import org.zerock.domain.MemberVO;

public interface BoardService {
	//���� ó��
	public void join(MemberVO member);
	
	public void register(BoardVO board);
	public BoardVO get(Long bno);
	
	public void modify(BoardVO board);
	public void remove(Long bno);
	//public List<BoardVO> getList();
	//����¡ ó��
	public List<BoardVO>getList(Criteria cri);
	//����
	public int getTotal(Criteria cri);
}
