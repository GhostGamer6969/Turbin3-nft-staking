use anchor_lang::prelude::*;

#[account]
pub struct UserAccount{
    pub points:u32,
    pub amount_stake: u8,
    pub bump:u8,
}
