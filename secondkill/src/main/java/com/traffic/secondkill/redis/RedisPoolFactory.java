package com.traffic.secondkill.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

@Component
public class RedisPoolFactory {

		@Autowired
		RedisConfig redisConfig;
		
		@Bean
		public JedisPool JedisPoolFactory(){
			JedisPoolConfig jpc = new JedisPoolConfig();
			jpc.setMaxIdle(redisConfig.getPoolMaxIdle());
			jpc.setMaxTotal(redisConfig.getPoolMaxTotal());
			jpc.setMaxWaitMillis(redisConfig.getPoolMaxWait() * 1000);
			JedisPool jp = new JedisPool(jpc,redisConfig.getHost(),redisConfig.getPort(),redisConfig.getTimeout()*1000,redisConfig.getPassword(),0);
			return jp;
		} 
}
