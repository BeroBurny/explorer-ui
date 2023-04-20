import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  SvgIcon,
  Button,
  Avatar,
} from "@mui/material";
import {
  DepositRecord,
  TransferDetails,
  EvmBridgeConfig,
} from "../../types";
import {
  formatTransferDate,
  getRandomSeed,
  computeAndFormatAmount,
  selectChains,
  selectToken,
  getNetworkIcon,
} from "../../utils/Helpers";
import { ReactComponent as DirectionalIcon } from "../../media/icons/directional.svg";
import { useStyles } from "./styles";

// TODO: just for mocking purposes
type ExplorerTable = {
  transactionList: DepositRecord[];
  handleOpenModal: (fromAddress: string | undefined) => () => void;
  handleClose: () => void;
  active: boolean;
  setActive: (state: boolean) => void;
  transferDetails: TransferDetails;
  chains: Array<EvmBridgeConfig>;
  handleTimelineButtonClick: () => void;
  timelineButtonClicked: boolean;
};

const ExplorerTable: React.FC<ExplorerTable> = ({
  transactionList,
  active,
  handleOpenModal,
  handleClose,
  transferDetails,
  chains,
  handleTimelineButtonClick,
  timelineButtonClicked,
}: ExplorerTable) => {
  const classes = useStyles();

  const renderTransferList = (transferData: DepositRecord[]) =>
    transferData.map((transfer: DepositRecord, idx: number) => {
      const { amount, fromDomainId, toDomainId } = transfer;

      const { fromChain, toChain } = selectChains(
        chains,
        fromDomainId!,
        toDomainId!
      );
      const fromToken = selectToken(fromChain, transfer.sourceTokenAddress);
      const randomString = getRandomSeed();
      const transferDateFormated = formatTransferDate(transfer.timestamp);

      //TODO check how to work better with BG and bigint
      const amountFormated = computeAndFormatAmount(amount ?? "0");

      return (
        <TableRow className={classes.row} key={transfer.id}>
          <TableCell className={classes.cellRow}>
            {transferDateFormated}
          </TableCell>
          <TableCell>
            <div className={classes.accountAddress}>
              {/* <Avatar size="small" className={classes.avatar}>
                <Blockies
                  seed={randomString}
                  size={15}
                  color={"pink"}
                  bgColor={"white"}
                />
              </Avatar> */}
              <span>{transfer.fromAddress}</span>
            </div>
          </TableCell>
          <TableCell className={classes.row}>
            <div>
              <span>
                <img
                  className={classes.imageToken}
                  src={getNetworkIcon(fromChain)}
                  alt="fromChain"
                />
                <span>{fromChain?.name ?? "Unknown chain"} to</span>
              </span>
              <span>
                <img
                  className={classes.imageToken}
                  src={getNetworkIcon(toChain)}
                  alt={fromToken?.symbol}
                />
                <span>{toChain?.name ?? "Unknown chain"}</span>
              </span>
            </div>
          </TableCell>
          <TableCell className={classes.row}>
            <span className={classes.amountInfo}>
              <img
                className={classes.imageValueToken}
                // src={showImageUrlNetworkIcons(fromToken?.imageUri!)}
                alt={fromToken?.symbol}
              />
              <span>
                {amountFormated} {fromToken?.name}
              </span>
            </span>
          </TableCell>
          <TableCell className={classes.row}>
            <div className={classes.viewDetailsInfo}>
              <Button onClick={handleOpenModal(transfer.id)}>
                <SvgIcon>
                  <DirectionalIcon />
                </SvgIcon>
                View Details
              </Button>
            </div>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow className={classes.row}>
          <TableCell>Date</TableCell>
          <TableCell>From</TableCell>
          <TableCell>Transfer</TableCell>
          <TableCell>Value</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{renderTransferList(transactionList)}</TableBody>
    </Table>
  );
};

export default ExplorerTable;
