package com.demo.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.model.Student;

public interface StudentRepositary extends JpaRepository<Student, Long>{

}
