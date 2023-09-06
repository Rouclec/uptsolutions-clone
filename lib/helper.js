import mongoose from "mongoose";
import catchAsync from "./catchAsync";
import DB from "./db";
import User from '../models/User'
import Role from '../models/Role'
import Document from '../models/Document'


export const deleteOne = (Model) =>
    catchAsync(async (req, res) => {
        await DB()
        const doc = await Model.findById(req.query?.id);

        if (!doc) {
            return res.status(404).json({
                status: "Not Found",
                message: `Document with id ${req.query?.id} not found`,
            })
        }
        await Model.findByIdAndUpdate(req.query?.id, { active: false });
        return res.status(204).json({
            status: "OK",
            message: "Document deleted successfully!",
        });
    });

export const updateOne = (Model, params) =>
    catchAsync(async (req, res) => {
        const id = req?.query?.id
        await DB()
        let body = {};
        params.forEach((param) => (body[param] = req.body[param] || null));
        const updatedDoc = await Model.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "OK",
            data: updatedDoc,
        });
    });

export const createOne = (Model, params) =>
    catchAsync(async (req, res) => {
        await DB()
        let body = {};
        params.forEach((param) => (body[param] = req.body[param]));
        const newDoc = await Model.create(req.body);

        res.status(201).json({
            status: "OK",
            data: newDoc,
        });
    });

export const getOne = (Model, populateOptions, selectOptions) =>
    catchAsync(async (req, res) => {
        const id = req?.query?.id
        await DB()
        let query = Model.findOne({ _id: id, active: true });

        if (populateOptions) {
            populateOptions.forEach(populateOption => query = query.populate(populateOption))
        };
        if (selectOptions) query = query.select(selectOptions);

        const doc = await query;

        if (!doc) {
            return res.status(404).json({
                status: "Not found",
                message: "Document not found",
            })

        }

        return res.status(200).json({
            status: "OK",
            data: doc,
        });
    });

export const getAll = (Model, status) =>
    catchAsync(async (req, res) => {
        await DB()
        let queryParms = { active: true };
        if (req.query) queryParms = { ...queryParms, ...req.query }
        const query = Model.find(queryParms)
        const docs = await query
        return res.status(200).json({
            status: "OK",
            results: docs?.length || 0,
            data: docs,
        });
    });