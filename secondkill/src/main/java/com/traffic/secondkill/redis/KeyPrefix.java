package com.traffic.secondkill.redis;

public interface KeyPrefix {
	
	public int expireSeconds();

	public String getPrefix();

}
