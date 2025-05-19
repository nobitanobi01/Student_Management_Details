package com.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Roll_No")
	private long rollno;
	@Column(name = "Full_Name")
	private String name;
	@Column(name = "DOB")
	private LocalDate date;
	@Column(name = "City")
	private String city;
	@Column(name = "Email_Id")
	private String emailid;
	
	public long getRollno() {
		return rollno;
	}
	public void setRollno(long rollno) {
		this.rollno = rollno;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getEmailid() {
		return emailid;
	}
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "Student [rollno=" + rollno + ", name=" + name + ", city=" + city + ", emailid=" + emailid + ", date="
				+ date + "]";
	}
	public Student(long rollno, String name, String city, String emailid, LocalDate date) {
		super();
		this.rollno = rollno;
		this.name = name;
		this.city = city;
		this.emailid = emailid;
		this.date = date;
	}
	public Student() {
		
	}
	
	
}
