import { Button, Typography } from "@mui/material";
import { BridgeConfig } from "../../types";

// import { shortenAddress } from "../../utils/Helpers";

import { useStyles } from "../Header/styles";

type TopBarNetworkConnectProps = {
  isReady: boolean | undefined;
  walletConnecting: boolean;
  homeConfig: BridgeConfig | undefined;
  address: string | undefined;
};

export default function TopBarNetworkConnect({
  isReady,
  homeConfig,
  address,
}: TopBarNetworkConnectProps) {
  const { classes } = useStyles();

  const handleClickOpen = () => {
    // dispatcher({ type: "setShowConnectionDialog", payload: true });
  };

  return (
    <>
      <section className={classes.state}>
        {!isReady ? (
          <Button
            fullWidth
            variant="contained"
            onClick={handleClickOpen}
            sx={{ px: 3, fontSize: 18 }}
          >
            Connect Wallet
          </Button>
        ) : (
          <>
            <div className={classes.mainInfo}>
              <Typography variant="h6" className={classes.address}>
                {homeConfig && (
                  <img
                    src={`/assets/images/networks/${homeConfig.nativeTokenSymbol.toLocaleLowerCase()}.svg`}
                    alt={"native token icon"}
                    className={classes.indicator}
                  />
                )}
              </Typography>
              <div className={classes.accountInfo}>
                <Typography variant="h6" className={classes.address}>
                  {address}
                </Typography>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}