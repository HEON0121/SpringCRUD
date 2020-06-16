package org.zerock.domain;

import java.util.List;

import lombok.Data;

@Data
public class MemberVO {
	private String userid;
	private String userpw;
	private String userName;
	private String userGender;
	private String userBirth;
	private String userEmail;
	private String userAddress;
	private String userPostcode;
	private String userPhone;
	private boolean enabled;
	private String regDate;
	private String updateDate;
	private List<AuthVO>authList;
}
