package com.traffic.secondkill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.traffic.secondkill.entity.User;
import com.traffic.secondkill.redis.RedisService;
import com.traffic.secondkill.redis.UserKey;
import com.traffic.secondkill.result.Result;
import com.traffic.secondkill.service.UserService;


@RestController
@RequestMapping("/main")
public class mainCrontroller {

	@Autowired
	UserService UserService;
	
	@Autowired
	RedisService redisService;
	
	@GetMapping("user")
	public String getUser(){
		User user = UserService.getUserById(1);
		return "success"; 
	}
	
	@GetMapping("jedis")
	public String getJedis(){
		String key = redisService.getJedis();
		return key; 
	}
	
	@GetMapping("redis/set")
	public Result<Boolean> setkey(){
		User user = new User();
		user.setId(1);
		user.setName("huangfeifei");
		redisService.set(UserKey.getById, ""+1,user);
		return Result.success(true); 
	}
	
	@RequestMapping("/redis/get")
    @ResponseBody
    public Result<User> redisGet() {
    	User  user  = redisService.get(UserKey.getById, ""+1, User.class);
        return Result.success(user);
    }
	

    @RequestMapping(value="/to_login")
    public String toLogin() {
    	
        return "login";
    }
    
    @RequestMapping("/them")
    public ModelAndView  them(ModelAndView  model) {
    	model.setViewName("login");
    	model.addObject("name","limingcong");
    	return model;
    }
    
    
}
