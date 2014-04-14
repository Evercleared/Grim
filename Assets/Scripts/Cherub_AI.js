﻿#pragma strict

var target : Transform;
var gravity : float = 20;
var moveSpeed : float = 6;  // chase speed
var chargeSpeed : float = 12; //Charge speed for last part of attack
var rotSpeed : float = 90;  // speed to turn to the player (degrees/second)
var attackDistance : float = 2;  // attack distance
var chargeDistance : float = 6;
var detectRange : float = 20;  // detection distance

private var transf : Transform;
private var character: CharacterController; 

function Start () { 
    if (!target) target = GameObject.FindWithTag ("Player").transform; 
    transf = transform;
    character = GetComponent(CharacterController);
}

function Update(){
	transform.position.z = 0;
    if (target){
        var tgtDir = target.position - transf.position;
        var tgtDist = tgtDir.magnitude; // get distance to the target
        var hit : RaycastHit;
        if ((Physics.Raycast(transf.position, tgtDir, hit, detectRange))&&hit.collider.tag.Equals("Player")){
            var moveDir = target.position - transf.position;
            moveDir.y = 0;  // prevents enemy tilting
            var rot = Quaternion.FromToRotation(Vector3.forward, moveDir);
            transf.rotation = Quaternion.RotateTowards(transf.rotation, rot, rotSpeed * Time.deltaTime);
            if (tgtDist <= attackDistance){  // if dist <= attackDistance: stop and attack
                // do your attack here
                print("Attack!");
            }
            else if((tgtDist <= chargeDistance) && (tgtDist > attackDistance))
            {
            	MoveCharacter(moveDir, chargeSpeed);
            }
            else {  // if attackDistance < dist < detectRange: chase the player
                // Move towards target
                MoveCharacter(moveDir, moveSpeed);
            }
        }
        else {
            // stays in idle mode if can't see target
            Idle(); 
        }
    }
}

var walkSpeed = 3.0; 
var travelTime = 2.0; 
var idleTime = 1.5;
var rndAngle = 180;  // enemy will turn +/- rndAngle

private var timeToNewDir = 0.0;
private var turningTime = 0.0;
private var turn: float;
var verticalHover = 2;

function Idle () { 
    // Walk around and pause in random directions 
    if (Time.time > timeToNewDir) { // time to change direction?
        turn = (Random.value > 0.5)? rndAngle : -rndAngle; // choose new direction
        turningTime = Time.time + idleTime; // will stop and turn during idleTime...
        timeToNewDir = turningTime + travelTime;  // and travel during travelTime 
    }
    if (Time.time < turningTime){ // rotate during idleTime...
        transform.Rotate(0, turn*Time.deltaTime/idleTime, 0);
    } else {  // and travel until timeToNewDir
        MoveCharacter(transform.forward, walkSpeed);
    }
}

function MoveCharacter(dir: Vector3, speed: float){ 
    var vel = dir.normalized * speed;  // vel = velocity to move 
    var hoverDir = (Random.value > 0.5)? 1 : -1; // choose new direction
    vel.y += hoverDir * verticalHover; 
    // clamp the current vertical velocity for gravity purpose
    //vel.y = Mathf.Clamp(character.velocity.y, -2, 2); 
    //vel.y -= gravity * Time.deltaTime;  // apply gravity
    character.Move(vel * Time.deltaTime);  // move
}