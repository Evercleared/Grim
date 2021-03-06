using UnityEngine;
using System.Collections;

public class PlatformerController : MonoBehaviour
{
	PlatformerPhysics mPlayer;
	PlayerHealthBarScript hpScript;
	bool mHasControl;
	public float dashingTime = 0f;

	void Start () 
	{
		mHasControl = true;
		mPlayer = GetComponent<PlatformerPhysics>();
		if (mPlayer == null)
			Debug.LogError("This object also needs a PlatformerPhysics component attached for the controller to function properly");
		hpScript = GetComponent<PlayerHealthBarScript> ();
		if (hpScript == null)
						Debug.Log ("CD won't function");
	}

	void Update () 
	{
		dashingTime += Time.deltaTime;
		//here are the actions that are triggered by a press or a release
		if (mPlayer && mHasControl)
		{
			if(Input.GetKeyDown(KeyCode.P) ){
				Application.Quit();
			}

			if (Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.RightShift)){
				if(((PlayerPrefs.GetInt("goodDash") == 1) || (PlayerPrefs.GetInt("evilDash") == 1)))
				{
					if(dashingTime >= 5f){
						dashingTime = 0;
						mPlayer.StartDash();
					}
				}
			}

			if(Input.GetMouseButtonDown(0))
				mPlayer.Attack();
			if(Input.GetMouseButtonDown(1))
				mPlayer.SpecialAttack();

		}
	}

	void FixedUpdate()
	{
		//here are actions where the buttons can be held for a longer period
		if (mPlayer && mHasControl)
		{
			if (Input.GetButton("Jump"))
				mPlayer.Jump();

			mPlayer.Walk(Input.GetAxisRaw("Horizontal"));
		}
	}

	public void GiveControl() { mHasControl = true; }
	public void RemoveControl() { mHasControl = false; }
	public bool HasControl() { return mHasControl; }
}

