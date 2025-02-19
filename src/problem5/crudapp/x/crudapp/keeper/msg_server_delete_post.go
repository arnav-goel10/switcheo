package keeper

import (
	"context"
	"crudapp/x/crudapp/types"
	"fmt"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) DeletePost(goCtx context.Context, msg *types.MsgDeletePost) (*types.MsgDeletePostResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	val, found := k.GetPost(ctx, msg.Id)

	if !found {
		return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("post with id %d not found", msg.Id))
	}

	if val.Creator != msg.Creator {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "Incorrect Owner")
	}

	k.RemovePost(ctx, msg.Id)

	return &types.MsgDeletePostResponse{}, nil
}
