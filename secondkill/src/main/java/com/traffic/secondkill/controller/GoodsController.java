package com.traffic.secondkill.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.traffic.secondkill.redis.RedisService;

@Controller
@RequestMapping("/goods")
public class GoodsController {
	
	private static Logger log = LoggerFactory.getLogger(GoodsController.class);

	@Autowired
	MiaoshaUserService userService;

	@Autowired
	RedisService redisService;

	@RequestMapping("/to_list")
	public String list(Model model, MiaoshaUser user) {
		log.info("user---"+user);
		model.addAttribute("user", user);
		return "goods_list";
	}

}
