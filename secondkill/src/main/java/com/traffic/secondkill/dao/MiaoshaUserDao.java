package com.traffic.secondkill.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.traffic.secondkill.entity.MiaoshaUser;

@Mapper
public interface  MiaoshaUserDao {

	
	@Select("select * from user where id = #{id}")
	public MiaoshaUser getById(@Param("id") long id);

}
