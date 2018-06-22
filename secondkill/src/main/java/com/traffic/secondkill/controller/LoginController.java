package com.traffic.secondkill.controller;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.traffic.secondkill.redis.RedisService;
import com.traffic.secondkill.result.Result;
import com.traffic.secondkill.service.MiaoshaUserService;
import com.traffic.secondkill.vo.LoginVo;

@Controller
@RequestMapping("/login")
public class LoginController {
private static Logger log = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	MiaoshaUserService userService;
	
	@Autowired
	RedisService redisService;
	
    @RequestMapping("/to_login")
    public String toLogin() {
        return "login";
    }
    
    
    @RequestMapping("/do_login")
    @ResponseBody
    public Result<Boolean> doLogin(HttpServletResponse response, @Valid LoginVo loginVo) {
    	log.info("---------LoginVo---------:"+loginVo.toString());
    	//登录
    	userService.login(response, loginVo);
    	return Result.success(true);
    }
}
