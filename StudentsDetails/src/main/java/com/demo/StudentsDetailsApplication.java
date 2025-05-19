package com.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.demo.service.StudentService;

@SpringBootApplication
public class StudentsDetailsApplication {

	public static void main(String[] args) {
	ApplicationContext context = SpringApplication.run(StudentsDetailsApplication.class, args);
	StudentService ss = context.getBean(StudentService.class);
	}
	

}
