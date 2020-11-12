package com.careerday.careerdayapp.Entities;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.UniqueConstraint;
import org.hibernate.annotations.NaturalId;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode
@Data
@NoArgsConstructor
@Entity
@Table(name="users",uniqueConstraints={@UniqueConstraint(columnNames={"phone"}),
@UniqueConstraint(columnNames={"email"}) })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

    
    private String firstName;

    private String lastName;

    private String password;

    @NaturalId
    private String email;

    @NaturalId
    private String phone;
    @ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
	      inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private List<Role> roles;
    
    
    
    

    public String getFullName() {
        return firstName != null ? firstName.concat(" ").concat(lastName) : "";
    }


     public User(String firstName, String lastName, String phone, String email, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
        this.phone=phone;
		this.email = email;
		this.password = password;
    }
     
    private boolean isAdmin;

   
}



    