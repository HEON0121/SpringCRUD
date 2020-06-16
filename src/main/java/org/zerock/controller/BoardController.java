package org.zerock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.zerock.domain.BoardVO;
import org.zerock.domain.Criteria;
import org.zerock.domain.MemberVO;
import org.zerock.domain.PageDTO;
import org.zerock.service.BoardServiceImpl;

//import com.sun.tools.sjavac.Log;

@Controller
@RequestMapping("/board/*")

public class BoardController {
	@Autowired
	private BoardServiceImpl service;
	//목록
	@GetMapping("/list")
	public void list(Model model, Criteria cri) {
		List<BoardVO>list = service.getList(cri);
		int total = service.getTotal(cri);
		model.addAttribute("list", list);
		model.addAttribute("pageMaker", new PageDTO(cri, total));
		model.addAttribute("total", total);
		}
	
	//등록폼
	@GetMapping("/register")
	@PreAuthorize("isAuthenticated()")
	public void register() {}
	//등록
	@PostMapping("/register")
	@PreAuthorize("isAuthenticated()")
	public String register(BoardVO board,
			RedirectAttributes rttr) {
		service.register(board);
		rttr.addFlashAttribute("result", board.getBno());
		return "redirect:/board/list";
	}
	
	//조회,수정폼
	@GetMapping({"/get", "/modify"})
	public void get(@RequestParam("bno") Long bno, 
					@ModelAttribute("cri") Criteria cri, 
					Model model) {
		model.addAttribute("board", service.get(bno));
	}
	

	//수정
	@PreAuthorize("principal.username == #writer")
	@PostMapping("/modify")
	public String modify(BoardVO board, 
			@ModelAttribute("cri") Criteria cri,
			RedirectAttributes rttr) {
		service.modify(board);
		rttr.addFlashAttribute("result", "success");
		rttr.addAttribute("pageNum", cri.getPageNum());
		rttr.addAttribute("amount", cri.getAmount());
		rttr.addAttribute("type", cri.getType());
		rttr.addAttribute("keyword", cri.getKeyword());
		return "redirect:/board/list" + cri.getListLink();
	}
	
	//삭제
	@PreAuthorize("principal.username == #writer")
	@PostMapping("/remove")
	public String remove(Long bno, 
			@ModelAttribute("cri") Criteria cri,
			RedirectAttributes rttr, String writer) {
		service.remove(bno);
		rttr.addFlashAttribute("result", "success");
		rttr.addAttribute("pageNum", cri.getPageNum());
		rttr.addAttribute("amount", cri.getAmount());
		rttr.addAttribute("type", cri.getType());
		rttr.addAttribute("keyword", cri.getKeyword());
		return "redirect:/board/list" + cri.getListLink();
	}
	
	//가입
	@PostMapping("/join")
	public ModelAndView memberJoin(MemberVO member) {
		ModelAndView model = new ModelAndView();
		service.join(member);
		model.setViewName("/customLogin");
		return model;
	}
	
	
}
