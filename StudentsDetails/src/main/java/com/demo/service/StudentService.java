package com.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.model.Student;
import com.demo.repositary.StudentRepositary;


@Service
public class StudentService {
	@Autowired
	private StudentRepositary sp;
	
	public StudentService(StudentRepositary sp) {
		this.sp = sp;
	}
	
	public List<Student> getStudents(){
		return sp.findAll();
	}
	
	public Student getStudent(Long rollno) {
		return sp.findById(rollno).orElse(null);
	}
	
	public Student addStudent(Student student) {
		return sp.save(student);
	}
	
	public Student updateStudent(Student student) {
		return sp.save(student);
	}
	
	public void deleteStudent(Long rollno) {
		 sp.deleteById(rollno);
		
	}
}
