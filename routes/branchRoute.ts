import express from "express";
import { BranchController } from "../controllers/BranchController";
import { BranchRepository } from "../repositories/branchRepository";
import { BranchInteractor } from "../interactors/branchInteractor";
const router = express.Router();

const repository = new BranchRepository();
const interactor = new BranchInteractor(repository);

const controller = new BranchController(interactor);

router.get(`${process.env.BASE_URI}/branches`, controller.onGetBranches.bind(controller));

export default router;