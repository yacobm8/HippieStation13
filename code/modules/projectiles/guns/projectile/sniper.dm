
/obj/item/weapon/gun/projectile/sniper_rifle
	name = "sniper rifle"
	desc = "A .50 caliber sniper rifle that can be loaded with custom ammunition. Can be strapped to your back if needed."
	icon_state = "sniper"
	item_state = "sniper"
	recoil = 2
	heavy_weapon = 1
	mag_type = /obj/item/ammo_box/magazine/sniper_rounds
	fire_delay = 40
	origin_tech = "combat=8;syndicate=4"
	can_unsuppress = 1
	can_suppress = 1
	w_class = 3
	zoomable = TRUE
	zoom_amt = 7 //Long range, enough to see in front of you, but no tiles behind you.
	slot_flags = SLOT_BACK
	fire_sound = 'sound/weapons/shotgun.ogg'

/obj/item/weapon/gun/projectile/sniper_rifle/update_icon()
	if(magazine)
		icon_state = "sniper-mag"
	else
		icon_state = "sniper"

//Normal Boolets
/obj/item/ammo_box/magazine/sniper_rounds
	name = "sniper rounds (.50)"
	icon_state = ".50mag"
	origin_tech = "combat=6;syndicate=2"
	ammo_type = /obj/item/ammo_casing/point50
	max_ammo = 6
	caliber = ".50"

/obj/item/ammo_box/magazine/sniper_rounds/update_icon()
	if(ammo_count())
		icon_state = "[initial(icon_state)]-ammo"
	else
		icon_state = "[initial(icon_state)]"

/obj/item/ammo_casing/point50
	desc = "A .50 bullet casing."
	caliber = ".50"
	projectile_type = /obj/item/projectile/bullet/sniper
	icon_state = ".50"

/obj/item/projectile/bullet/sniper
	damage = 70
	stun = 5
	weaken = 5
	armour_penetration = 50
	var/breakthings = TRUE

/obj/item/projectile/bullet/sniper/on_hit(atom/target, blocked = 0, hit_zone)
	if((blocked != 100) && (!ismob(target) && breakthings))
		target.ex_act(rand(1,2))

	return ..()


//Sleepy ammo
/obj/item/ammo_box/magazine/sniper_rounds/soporific
	name = "sniper rounds (Zzzzz)"
	desc = "Soporific sniper rounds, designed for happy days and dead quiet nights..."
	icon_state = "soporific"
	origin_tech = "combat=6;syndicate=3"
	ammo_type = /obj/item/ammo_casing/soporific
	max_ammo = 3
	caliber = ".50"

/obj/item/ammo_casing/soporific
	desc = "A .50 bullet casing, specialised in sending the target to sleep, instead of hell."
	caliber = ".50"
	projectile_type = /obj/item/projectile/bullet/sniper/soporific
	icon_state = ".50"

/obj/item/projectile/bullet/sniper/soporific
	armour_penetration = 0
	nodamage = 1
	stun = 0
	weaken = 0
	breakthings = FALSE

/obj/item/projectile/bullet/sniper/soporific/on_hit(atom/target, blocked = 0, hit_zone)
	if((blocked != 100) && istype(target, /mob/living))
		var/mob/living/L = target
		L.SetSleeping(20)

	return ..()


//hemorrhage ammo
/obj/item/ammo_box/magazine/sniper_rounds/haemorrhage
	name = "sniper rounds (Bleed)"
	desc = "Haemorrhage sniper rounds, leaves your target in a pool of crimson pain"
	icon_state = "haemorrhage"
	origin_tech = "combat=7;syndicate=5"
	ammo_type = /obj/item/ammo_casing/haemorrhage
	max_ammo = 5
	caliber = ".50"

/obj/item/ammo_casing/haemorrhage
	desc = "A .50 bullet casing, specialised in causing massive bloodloss"
	caliber = ".50"
	projectile_type = /obj/item/projectile/bullet/sniper/haemorrhage
	icon_state = ".50"

/obj/item/projectile/bullet/sniper/haemorrhage
	armour_penetration = 15
	damage = 15
	stun = 0
	weaken = 0
	breakthings = FALSE

/obj/item/projectile/bullet/sniper/haemorrhage/on_hit(atom/target, blocked = 0, hit_zone)
	if((blocked != 100) && istype(target, /mob/living/carbon/human))
		var/mob/living/carbon/human/H = target
		H.drip(100)

	return ..()



//penetrator ammo
/obj/item/ammo_box/magazine/sniper_rounds/penetrator
	name = "sniper rounds (penetrator)"
	desc = "An extremely powerful round capable of passing straight through cover and anyone unfortunate enough to be behind it."
	ammo_type = /obj/item/ammo_casing/penetrator
	max_ammo = 5

/obj/item/ammo_casing/penetrator
	desc = "A .50 caliber penetrator round casing."
	caliber = ".50"
	projectile_type = /obj/item/projectile/bullet/sniper/penetrator
	icon_state = ".50"

/obj/item/projectile/bullet/sniper/penetrator
	name = "penetrator round"
	damage = 60
	forcedodge = 1
	stun = 0
	weaken = 0
	breakthings = FALSE