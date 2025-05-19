package com.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.model.Student;
import com.demo.service.StudentService;

@RestController
public class Controller {
	@Autowired
	private StudentService ss;

	public Controller(StudentService ss) {
		this.ss=ss;
	}
	
	@GetMapping("/students")
	@CrossOrigin
	public List<Student> getStudents(){
		return ss.getStudents();
	}
	
	@GetMapping("/student/{rollno}")
	public Student getStduent(@PathVariable Long rollno) {
		return ss.getStudent(rollno);
	}
		
	@PutMapping("/student/{rollno}")
	@CrossOrigin
	public Student updateStudent(@RequestBody Student student,@PathVariable("rollno") Long rollno) {
		return ss.updateStudent(student);
	}
	
	@PostMapping("/students")
	@CrossOrigin
	public ResponseEntity<Student> addNew(@RequestBody() Student student){
		Student newProduct = ss.addStudent(student);
		return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
	}
	
	@DeleteMapping("/student/{rollno}")
	@CrossOrigin
	public void deleteStudent(@PathVariable("rollno") Long rollno) {
		ss.deleteStudent(rollno);
	}
}
