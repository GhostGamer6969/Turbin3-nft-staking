pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("TCAAhoBFnQdjmLqGsgy33sh9hJB7J8C8kH826hko6ue");

#[program]
pub mod anchor_nft_staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initialize_config::handler(ctx)
    }
}
