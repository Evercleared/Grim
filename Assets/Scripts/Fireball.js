#pragma strict
//Credit: JamesLeeNZ
 

var _velocity : float = 7;
var _torque: float = 1.15;
var _target : Transform;
var _rigidbody : Rigidbody;
var destroyTimer = 0.0;
var _particles : ParticleSystem;
var trans : Transform;

function Start()

{
	trans = transform;
  _rigidbody = transform.rigidbody;
  _target = GameObject.FindGameObjectWithTag("Player").transform;
  _particles = transform.particleSystem;
  
  var degrees : float = Mathf.Deg2Rad * Vector3.Angle(Vector3.up, trans.position - _target.position);
  _particles.startRotation = degrees;
  destroyTimer = Time.time;

  Fire();

}

 

function Fire()

{

   var distance = Mathf.Infinity;

   for (var go : GameObject in GameObject.FindGameObjectsWithTag("Player"))  { 
		

      var diff = (go.transform.position - transform.position).sqrMagnitude;   

 

      if(diff < distance)

      {

         distance = diff;

         _target =  go.transform;

 

      }

   }

}

 

function FixedUpdate()

{
	if(Time.time - destroyTimer > 7)
	{
		Destroy(gameObject);
	}
 
	transform.position.z = 0;
	
  	if(_target == null || _rigidbody == null)
	{
		print("null target: "+_target.tag+" Rigid: "+_rigidbody.tag);
     	return;
	}
    _rigidbody.velocity = transform.forward * _velocity;

 

    var targetRotation = Quaternion.LookRotation(_target.position - transform.position);

    _rigidbody.MoveRotation(Quaternion.RotateTowards(transform.rotation, targetRotation, _torque));

}

 

function OnTriggerEnter(other : Collider)

{
	if(!other.gameObject.CompareTag("Enemy"))
	{
		if(other.gameObject.CompareTag("Player"))
		{
			other.gameObject.SendMessage("Damage",1);
		}
   		Destroy(gameObject);
   	}

}