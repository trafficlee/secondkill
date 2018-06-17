package com.traffic.secondkill.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.traffic.secondkill.entity.User;

@Mapper
public interface UserDao {
	
	@Select("SELECT * FROM USER WHERE ID = #{id}")
	public User getUser(@Param("id")int id);
}
