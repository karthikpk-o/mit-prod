import express from 'express';
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken"
import config from "../config.js"
import authMiddleware from '../middleware.js';
import { logger, morganMiddleware } from '../logger/index.js';

const prisma = new PrismaClient();
const {JWT_SECRET} = config;
const router = express.Router();

router.use(morganMiddleware)

//login call
router.post("/login", async(req, res)=>{
  try{
      const user = await prisma.users.findFirst({
        where:{
            UserID : req.body.username,
            Password: req.body.password
        }
    })
    if(user){
        const token = jwt.sign({
            UserID: user.UserID,
            Role: user.Role
        }, JWT_SECRET);
        logger.info(`User ${user.UserID} logged in successfully`)
        res.json({
            Role: user.Role,
            token : token
        })
        return;
    }else{
      res.status(411).json({
        message : "Entered UserID is not registered with the system"
      })
      logger.warn(`Login failed for user ${req.body.username}`)
    }
  }catch(error){
    logger.error(`Login error : ${error.message}`)
  }
})

//call to send navbar items
router.get('/navbar', authMiddleware, async (req, res) => {
    try {
      const userRole = req.user.Role; 
      const mainNavItems = await prisma.treeNode.findMany({
        orderBy: {
          DisplayOrder: 'asc',
        },
      });
  
      const subMenuItems = await prisma.functionalities.findMany({
        where: {
          RoleID: userRole, 
        },
        orderBy: {
          DisplayOrder: 'asc',
        },
      });
  
      const menuWithSubMenus = mainNavItems.map(mainItem => {
        const subMenus = subMenuItems.filter(sub => sub.TreeNode === mainItem.ID);
        return {
          ...mainItem,
          subMenus, 
        };
      });
      res.json(menuWithSubMenus);
    } catch (error) {
      console.error('Error fetching navigation bar items', error);
      res.status(500).json({ error: 'Error fetching navigation bar items' });
    }
  });

//voucher entry calls
async function generateVoucherID() {
  const latestVoucher = await prisma.voucher.findFirst({
    orderBy: {
      VoucherID: 'desc'
    }
  });

  let nextIDNumber = 1; // Start from VOC00001 if no voucher exists

  // If there are existing vouchers, extract the numeric part and increment it
  if (latestVoucher) {
    const latestVoucherID = latestVoucher.VoucherID; // Example: "VOC00001"
    const numericPart = parseInt(latestVoucherID.replace('VOC', ''), 10);
    nextIDNumber = numericPart + 1; // Increment the numeric part
  }
  const newVoucherID = 'VOC' + String(nextIDNumber).padStart(5, '0'); // Example: "VOC00002"
  return newVoucherID;
}

router.get("/voucherid", authMiddleware, async (req, res) => {
  try {
    const currentuser = req.user;
    const VoucherID = await generateVoucherID(); // Use await to handle the async function

    if (VoucherID) {
      res.json({
        VoucherID: VoucherID,
        User: currentuser.UserID
      });
    } else {
      res.status(411).json({
        message: "Error generating Voucher ID"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});


router.post('/entry', authMiddleware, async(req,res)=>{
    try {
      const {formData, voucherData} = req.body;
        const voucher = await prisma.voucher.create({
            data:{
              VoucherType: formData.VoucherType,
              IsInwardRCM: formData.IsInwardRCM, //varchar(1)
              VoucherStyle: formData.VoucherStyle,
              VoucherSource: formData.VoucherSource,
              InvoiceDate: formData.InvoiceDate,
              StateCode: formData.StateCode,
              VendorTaxClassification: formData.VendorTaxClassification,
              GSTIN: formData.GSTIN,
              AccountingDate: formData.AccountingDate,
              LineNarration: formData.LineNarration,
              InvoiceAmount: formData.InvoiceAmount,
              HoldAmount: formData.HoldAmount,
              HoldReason: formData.HoldReason,
              hasTDS: formData.hasTDS,
              Inward_No: formData.Inward_No,
              Misamount: formData.Misamount,
              IGST: formData.IGST,
              CGST: formData.CGST,
              SGST: formData.SGST,
              Cess: formData.Cess,
              TCSAmount: formData.TCSAmount,
              InputTax: formData.InputTax,
              ApprovalUnit: formData.ApprovalUnit,
              SC_Institute: formData.SC_Institute,
              UserID: formData.UserID,
              Datem: formData.Datem,
              ApprovedBy: formData.ApprovedBy,
              ApprovedDate: formData.ApprovedDate,
              Ismis: formData.Ismis,
              isMisUploaded: formData.isMisUploaded,
              IsServiceCharge: formData.IsServiceCharge,
              RCM: formData.RCM,
              DeferCap: formData.DeferCap,
              DeferInv: formData.DeferInv,
              HasAsset: formData.HasAsset,
              unposted: formData.unposted,
              IsPrepaid: formData.IsPrepaid,
              EmailCategory: formData.EmailCategory,
              IsSubVendor: formData.IsSubVendor,
              Goods_Services: formData.Goods_Services,
              GSTR1unit: formData.GSTR1unit,
              BusinessUnit : formData.BusinessUnit,
              VoucherID: formData.VoucherID,
              InvoiceStatus: formData.InvoiceStatus,
              VoucherLink: formData.VoucherLink,
              Entry_no: formData.Entry_no,
              VendorID: formData.VendorID,
              EnteredBy: formData.EnteredBy
            },
        });

        if(voucher){
          const Vacc = await prisma.voucherAccounting.createMany({
              data:[
                {
                  Account: voucherData.debitEntry.Account,
                  BusinessUnit: voucher.BusinessUnit,
                  VoucherID: voucher.VoucherID,
                  Amount: parseFloat(voucherData.debitEntry.Amount),
                  DebitCredit: voucherData.debitEntry.DebitCredit,
                  VoucherLine: voucherData.creditEntry.VoucherLine
                },
                {
                  Account: voucherData.creditEntry.Account,
                  BusinessUnit: voucher.BusinessUnit,
                  VoucherID: voucher.VoucherID,
                  Amount: parseFloat(voucherData.creditEntry.Amount),
                  DebitCredit: voucherData.creditEntry.DebitCredit,
                  VoucherLine: voucherData.debitEntry.VoucherLine
                }
              ]
          })
        }
        res.status(200).json({
            message: "Voucher and accounting entered successfully"
        });
    } catch (error) {
        console.error('Prisma error:', error);
        res.status(500).json({
            message: "Error creating voucher",
            error: error.message
        });
    }
});

//to get vendor details for voucher Entry
router.get("/vendordetails", async (req, res) => {
  try {
    const vendorM = await prisma.vendor.findFirst({
      where: {
        VendorID: req.body.VendorID
      }
    });
    const vendetails = await prisma.vendorDetails.findFirst({
      where: {
        VendorID: req.body.VendorID
      }
    });

    if (vendorM && vendetails) {
      const result = {
        ...vendorM,
        ...vendetails
      };
      res.json(result);
    } else {
      res.status(404).json({
        message: "Couldn't find the vendor you're looking for"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching vendor details",
      error: error.message
    });
  }
});

// to get account details in voucher accounting
router.get("/accdetails", async(req, res)=>{
  try{
    const accM = await prisma.account.findFirst({
      where:{
        Account : req.query.Account
      }
    })
    if(accM){
      res.json({
        ADesc: accM.ADesc
      })
    }
  }catch(error){
    res.status(500).json({
      message: "Account not found"
    })
  }
});

//voucher approval calls
router.get("/vouchers", async(req, res)=>{
  try{
    const vouchers = await prisma.voucher.findMany({
      where:{
        ApprovedBy: "",
        ApprovedDate: "",
      }
    })
  }catch(error){
    res.status(500).json({
      message: "Vouchers not found"
    })
  }
});

router.post("/voucherapproval", authMiddleware, async(req, res)=>{
  try{
    const result = await prisma.voucher.update({
      where:{
        VoucherID: req.body.VoucherID
      },
      data: {
        ApprovedBy: req.user.UserID,
        ApprovedDate: req.body.ApprovedDate,
      }
    })
  }catch(error){
    res.status(500).json({
      message: "Vouchers not found"
    })
  }
})

export default router;