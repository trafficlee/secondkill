package com.traffic.secondkill.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.traffic.secondkill.dao.UserDao;
import com.traffic.secondkill.entity.User;

@Service
public class UserService {

	@Autowired
	UserDao userDao;
	
	public User getUserById(int id){
		return userDao.getUser(id);
	}
}
