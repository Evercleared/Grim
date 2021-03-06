﻿using UnityEngine;
using System.Collections;

public class OpenBossDoor : MonoBehaviour {

	public AudioClip doorRejectClip;
	private GameObject player;                      // Reference to the player.
	private grimInfo griminfo;        // Reference to the player's inventory.
	
	
	void Awake ()
	{
		// Setting up the references.
		player = GameObject.FindGameObjectWithTag("Player");
		griminfo = player.GetComponent<grimInfo>();
	}
	
	
	void OnTriggerEnter (Collider other)
	{
		// If the colliding gameobject is the player...
		if (other.gameObject == player) {
			if ((griminfo.keys == griminfo.maxKeys) && !griminfo.usedKey) // Check to see if the player has the key
			{
				// Destroy the door
				gameObject.GetComponent<MeshRenderer>().enabled=false;
				gameObject.GetComponent<MeshCollider>().enabled=false;
				Destroy (gameObject);
				griminfo.usedKey = true;
			} else {
				AudioSource.PlayClipAtPoint(doorRejectClip, transform.position);
			}
		}
	}

	void OnTriggerExit (Collider other)
	{
		gameObject.GetComponent<MeshRenderer> ().enabled = true;
		gameObject.GetComponent<MeshCollider> ().enabled = true;

	}
}
