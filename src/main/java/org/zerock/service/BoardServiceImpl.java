package org.zerock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zerock.domain.BoardVO;
import org.zerock.domain.Criteria;
import org.zerock.domain.MemberVO;
import org.zerock.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {
	@Autowired
	private BoardMapper mapper;
	@Override
	public void register(BoardVO board) {
		// TODO Auto-generated method stub
		mapper.insertSelectKey(board);
	}

	@Override
	public BoardVO get(Long bno) {
		// TODO Auto-generated method stub
		return mapper.read(bno);
	}

	@Override
	public void modify(BoardVO board) {
		// TODO Auto-generated method stub
		mapper.update(board);
	}

	@Override
	public void remove(Long bno) {
		// TODO Auto-generated method stub
		mapper.delete(bno);
	}

	@Override
	public List<BoardVO> getList(Criteria cri) {
		// TODO Auto-generated method stub
		return mapper.getListWithPaging(cri);
	}

	@Override
	public int getTotal(Criteria cri) {
		// TODO Auto-generated method stub
		return mapper.getTotalCount(cri);
	}
// 가입 처리
	@Override
	public void join(MemberVO member) {
		// TODO Auto-generated method stub
		mapper.join(member);
	}



}
