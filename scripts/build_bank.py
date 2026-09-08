#!/usr/bin/env python3
"""Generate PassPTCE original question bank TypeScript modules."""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "content" / "questions"
OUT.mkdir(parents=True, exist_ok=True)

def q(id, domain, stem, choices, correct, rationale, tags, paid=False, needs_review=False):
    assert len(choices) == 4 and correct in (0, 1, 2, 3)
    return {
        "id": id,
        "domain": domain,
        "stem": stem,
        "choices": list(choices),
        "correctIndex": correct,
        "rationale": rationale,
        "topicTags": list(tags),
        "paidOnly": paid,
        "needsReview": needs_review,
    }

questions = []
# --- Medications diagnostic (35) ---
questions += [
q("med-001","medications","A prescription is written for atorvastatin. Which brand name matches this generic?",
  ["Lipitor","Zocor","Crestor","Pravachol"],0,
  "Atorvastatin is the generic for Lipitor. Zocor is simvastatin, Crestor is rosuvastatin, Pravachol is pravastatin.",
  ["brand-generic","statins"]),
q("med-002","medications","Which generic corresponds to the brand name Synthroid?",
  ["levothyroxine","liothyronine","methimazole","propylthiouracil"],0,
  "Synthroid is a brand of levothyroxine. Liothyronine is Cytomel; methimazole and PTU are antithyroid agents.",
  ["brand-generic","thyroid"]),
q("med-003","medications","Metformin is most commonly classified in which therapeutic category?",
  ["Biguanide antidiabetic","Sulfonylurea","GLP-1 receptor agonist","DPP-4 inhibitor"],0,
  "Metformin is a biguanide used for type 2 diabetes.",
  ["therapeutic-class","diabetes"]),
q("med-004","medications","Which medication is a high-alert anticoagulant commonly dispensed as a vitamin K antagonist?",
  ["warfarin","clopidogrel","aspirin","enoxaparin"],0,
  "Warfarin is a vitamin K antagonist and high-alert anticoagulant. Clopidogrel and aspirin are antiplatelets; enoxaparin is an LMWH.",
  ["high-alert","anticoagulant"], needs_review=True),
q("med-005","medications","Lisinopril belongs to which drug class?",
  ["ACE inhibitor","ARB","Beta blocker","Calcium channel blocker"],0,
  "Lisinopril is an ACE inhibitor.",
  ["therapeutic-class","cardiovascular"]),
q("med-006","medications","Which controlled substance schedule typically includes drugs with accepted medical use and the highest abuse potential among scheduled prescription drugs (e.g., oxycodone products)?",
  ["Schedule II","Schedule III","Schedule IV","Schedule V"],0,
  "Schedule II includes many potent opioids with accepted medical use and high abuse potential.",
  ["schedules","controlled-substances"]),
q("med-007","medications","Alprazolam is generally placed in which controlled substance schedule under federal law?",
  ["Schedule IV","Schedule II","Schedule III","Schedule V"],0,
  "Benzodiazepines such as alprazolam are Schedule IV federally.",
  ["schedules","benzodiazepines"]),
q("med-008","medications","Which brand name matches the generic amlodipine?",
  ["Norvasc","Lopressor","Coreg","Diovan"],0,
  "Amlodipine is Norvasc.",
  ["brand-generic","cardiovascular"]),
q("med-009","medications","Omeprazole is primarily used to treat which condition category?",
  ["Acid-related disorders (e.g., GERD)","Bacterial skin infections","Type 1 diabetes","Acute gout flares"],0,
  "Omeprazole is a proton pump inhibitor used for GERD and related acid disorders.",
  ["indications","PPI"]),
q("med-010","medications","Which medication is an SSRI antidepressant often known by the brand Zoloft?",
  ["sertraline","fluoxetine","paroxetine","citalopram"],0,
  "Zoloft is sertraline.",
  ["brand-generic","antidepressants"]),
]
questions += [
q("med-011","medications","Insulin products are considered high-alert primarily because:",
  ["Dosing errors can cause severe hypoglycemia or hyperglycemia","They are always Schedule II controlled substances","They must be dispensed only in unit-dose cups","They have no brand-generic equivalents"],0,
  "Insulins are high-alert due to risk of serious harm from dosing and product mix-ups.",
  ["high-alert","insulin","diabetes"]),
q("med-012","medications","Gabapentin is commonly used for which of the following?",
  ["Neuropathic pain and certain seizure disorders","Acute bacterial meningitis first-line monotherapy","Thrombolysis in stroke","Vitamin B12 deficiency"],0,
  "Gabapentin is used for neuropathic pain and as adjunctive therapy for some seizures.",
  ["indications","neurology"], needs_review=True),
q("med-013","medications","Which generic matches the brand name Glucophage?",
  ["metformin","glipizide","glyburide","pioglitazone"],0,
  "Glucophage is metformin.",
  ["brand-generic","diabetes"]),
q("med-014","medications","Hydrocodone combination products are federally classified as:",
  ["Schedule II","Schedule III","Schedule IV","Schedule V"],0,
  "Hydrocodone combination products are Schedule II under federal law.",
  ["schedules","opioids"]),
q("med-015","medications","Montelukast (Singulair) is primarily indicated for:",
  ["Asthma and allergic rhinitis management","Acute hypertensive emergency","Clostridium difficile infection","Opioid withdrawal"],0,
  "Montelukast is a leukotriene receptor antagonist used for asthma and allergic rhinitis.",
  ["indications","respiratory"]),
q("med-016","medications","Which drug is a loop diuretic commonly branded as Lasix?",
  ["furosemide","hydrochlorothiazide","spironolactone","chlorthalidone"],0,
  "Lasix is furosemide, a loop diuretic.",
  ["brand-generic","diuretics"]),
q("med-017","medications","Pregabalin (Lyrica) is federally scheduled as:",
  ["Schedule V","Schedule II","Schedule III","Schedule I"],0,
  "Pregabalin is Schedule V federally.",
  ["schedules","neurology"]),
q("med-018","medications","What is the primary purpose of a REMS program?",
  ["To manage known or potential serious risks of certain medications while keeping them available","To set AWP pricing for wholesalers","To replace the need for a valid prescription","To authorize technicians to prescribe controlled substances"],0,
  "REMS programs manage serious risks for specific drugs.",
  ["REMS","federal-med-safety"]),
q("med-019","medications","Clopidogrel is best described as:",
  ["An antiplatelet agent","A direct oral anticoagulant (DOAC)","A low molecular weight heparin","A vitamin K antagonist"],0,
  "Clopidogrel (Plavix) is an antiplatelet P2Y12 inhibitor.",
  ["therapeutic-class","cardiovascular"]),
q("med-020","medications","Which medication is commonly used as a short-acting beta agonist rescue inhaler component?",
  ["albuterol","tiotropium","fluticasone alone as rescue","montelukast"],0,
  "Albuterol is a SABA used for rescue.",
  ["respiratory","dosage-forms"]),
]
questions += [
q("med-021","medications","Levothyroxine counseling often emphasizes taking the dose:",
  ["On an empty stomach, consistently, away from interacting supplements like calcium/iron","Only with a high-fat meal","Only at bedtime with milk","Crushed and mixed into grapefruit juice"],0,
  "Absorption is affected by food and polyvalent cations; consistent empty-stomach timing is standard counseling.",
  ["counseling","thyroid"], needs_review=True),
q("med-022","medications","Which antibiotic class includes azithromycin?",
  ["Macrolides","Fluoroquinolones","Cephalosporins","Tetracyclines"],0,
  "Azithromycin is a macrolide.",
  ["therapeutic-class","antibiotics"]),
q("med-023","medications","Tramadol is federally classified as:",
  ["Schedule IV","Schedule II","Schedule III","Unscheduled"],0,
  "Tramadol is Schedule IV under federal law.",
  ["schedules","opioids"]),
q("med-024","medications","Losartan belongs to which class?",
  ["Angiotensin II receptor blocker (ARB)","ACE inhibitor","Alpha-1 blocker","Nitrate"],0,
  "Losartan is an ARB.",
  ["therapeutic-class","cardiovascular"]),
q("med-025","medications","Which medication is a proton pump inhibitor?",
  ["pantoprazole","sucralfate","metoclopramide","calcium carbonate only"],0,
  "Pantoprazole is a PPI.",
  ["therapeutic-class","GI"]),
q("med-026","medications","Amphetamine mixed salts (e.g., Adderall) are typically:",
  ["Schedule II","Schedule III","Schedule IV","Schedule V"],0,
  "Amphetamine products used for ADHD are Schedule II.",
  ["schedules","CNS-stimulants"]),
q("med-027","medications","Which brand matches generic escitalopram?",
  ["Lexapro","Prozac","Effexor","Wellbutrin"],0,
  "Lexapro is escitalopram.",
  ["brand-generic","antidepressants"]),
q("med-028","medications","Potassium chloride oral solutions/tablets are high-alert in many settings because:",
  ["Incorrect dosing or route confusion can cause serious cardiac harm","They are Schedule I substances","They must be refrigerated after every open","They have no NDC numbers"],0,
  "Concentrated potassium products are high-alert due to risk of severe harm from dosing/route errors.",
  ["high-alert","electrolytes"]),
q("med-029","medications","Duloxetine (Cymbalta) is commonly used for:",
  ["Depression and certain neuropathic pain conditions","Acute gout only","Vitamin D deficiency","Helicobacter pylori monotherapy"],0,
  "Duloxetine is an SNRI used for MDD and approved neuropathic/pain indications.",
  ["indications","antidepressants"], needs_review=True),
q("med-030","medications","Which medication is an HMG-CoA reductase inhibitor (statin)?",
  ["rosuvastatin","ezetimibe","fenofibrate","cholestyramine"],0,
  "Rosuvastatin is a statin.",
  ["therapeutic-class","statins"]),
q("med-031","medications","Carvedilol is best classified as:",
  ["A nonselective beta blocker with alpha-blocking activity","An ACE inhibitor","A thiazide diuretic","A DOAC"],0,
  "Carvedilol blocks beta and alpha-1 receptors.",
  ["therapeutic-class","cardiovascular"]),
q("med-032","medications","Which dosage form is designed for placement under the tongue for rapid absorption?",
  ["Sublingual tablet","Enteric-coated tablet","Transdermal patch","Rectal enema"],0,
  "Sublingual tablets dissolve under the tongue for transmucosal absorption.",
  ["dosage-forms"]),
q("med-033","medications","Methylphenidate products used for ADHD are generally:",
  ["Schedule II","Schedule IV","Schedule V","Not controlled"],0,
  "Methylphenidate is Schedule II federally.",
  ["schedules","CNS-stimulants"]),
q("med-034","medications","Apixaban is a:",
  ["Direct oral anticoagulant (factor Xa inhibitor)","Vitamin K antagonist","Antiplatelet P2Y12 inhibitor","Low molecular weight heparin"],0,
  "Apixaban (Eliquis) is a factor Xa inhibitor DOAC.",
  ["anticoagulant","therapeutic-class"], needs_review=True),
q("med-035","medications","Which medication is commonly associated with a REMS for teratogenicity risk (isotretinoin programs)?",
  ["isotretinoin","amoxicillin","acetaminophen","loratadine"],0,
  "Isotretinoin has a well-known REMS/restricted program due to teratogenicity (iPLEDGE).",
  ["REMS","safety"]),
]
# Paid medications (28)
questions += [
q("med-p01","medications","Which brand matches generic sitagliptin?",["Januvia","Invokana","Farxiga","Jardiance"],0,"Januvia is sitagliptin (DPP-4).",["brand-generic","diabetes"],True),
q("med-p02","medications","Bupropion is commonly used for depression and which additional labeled use?",["Smoking cessation (Zyban)","Acute opioid overdose reversal","Vitamin K deficiency","Anthrax prophylaxis"],0,"Bupropion (Zyban) is used for smoking cessation as well as depression.",["indications"],True,True),
q("med-p03","medications","Tamsulosin is primarily used for:",["Benign prostatic hyperplasia (BPH) symptoms","Acute migraine abortion","Hypothyroidism","Community-acquired pneumonia"],0,"Tamsulosin is an alpha-1 blocker for BPH.",["indications","urology"],True),
q("med-p04","medications","Which drug is a cephalosporin antibiotic?",["cephalexin","azithromycin","ciprofloxacin","doxycycline"],0,"Cephalexin is a first-generation cephalosporin.",["antibiotics"],True),
q("med-p05","medications","Zolpidem is federally scheduled as:",["Schedule IV","Schedule II","Schedule III","Schedule I"],0,"Zolpidem (Ambien) is Schedule IV.",["schedules","sedative-hypnotics"],True),
q("med-p06","medications","Which insulin is typically considered rapid-acting?",["insulin aspart","insulin glargine","insulin detemir","NPH insulin"],0,"Aspart is rapid-acting; glargine/detemir are long-acting; NPH is intermediate.",["insulin","diabetes"],True,True),
q("med-p07","medications","Allopurinol is used primarily to:",["Lower uric acid in gout management","Treat acute bacterial cystitis","Reverse heparin","Treat hypothyroidism"],0,"Allopurinol reduces uric acid production.",["indications","gout"],True),
q("med-p08","medications","Which brand matches generic valsartan?",["Diovan","Cozaar","Benicar","Avapro"],0,"Diovan is valsartan.",["brand-generic"],True),
q("med-p09","medications","Codeine combination cough products may be scheduled as:",["Schedule III or V depending on formulation and federal/state rules","Schedule I always","Schedule II only if OTC","Never controlled"],0,"Codeine combination products appear in C-III or C-V depending on strength/formulation.",["schedules"],True,True),
q("med-p10","medications","Spironolactone is a:",["Potassium-sparing diuretic / aldosterone antagonist","Loop diuretic","Thiazide diuretic","Osmotic diuretic"],0,"Spironolactone antagonizes aldosterone and spares potassium.",["diuretics"],True),
q("med-p11","medications","Which medication is an atypical antipsychotic?",["quetiapine","sertraline","lorazepam","cetirizine"],0,"Quetiapine is an atypical antipsychotic.",["psychiatric"],True),
q("med-p12","medications","Nitroglycerin sublingual tablets are used for:",["Acute angina relief","Chronic constipation","Type 2 diabetes first-line","Bacterial vaginosis"],0,"SL nitroglycerin treats acute anginal episodes.",["cardiovascular","dosage-forms"],True),
q("med-p13","medications","Which drug is a fluoroquinolone?",["ciprofloxacin","amoxicillin","cephalexin","azithromycin"],0,"Ciprofloxacin is a fluoroquinolone.",["antibiotics"],True),
q("med-p14","medications","Methadone used for opioid use disorder / analgesia is:",["Schedule II","Schedule IV","Schedule V","Not controlled"],0,"Methadone is Schedule II.",["schedules","opioids"],True),
q("med-p15","medications","Ondansetron is primarily used as:",["An antiemetic (5-HT3 antagonist)","A stimulant laxative","An anticonvulsant","A statin"],0,"Ondansetron blocks 5-HT3 receptors to reduce nausea/vomiting.",["GI","indications"],True),
q("med-p16","medications","Which brand matches generic fluticasone nasal?",["Flonase","Nasonex","Rhinocort","Astelin"],0,"Flonase is fluticasone.",["brand-generic","respiratory"],True),
q("med-p17","medications","Diazepam is scheduled as:",["Schedule IV","Schedule II","Schedule III","Schedule V"],0,"Diazepam is Schedule IV.",["schedules","benzodiazepines"],True),
q("med-p18","medications","Empagliflozin belongs to which class?",["SGLT2 inhibitor","DPP-4 inhibitor","Sulfonylurea","Meglitinide"],0,"Empagliflozin (Jardiance) is an SGLT2 inhibitor.",["diabetes","therapeutic-class"],True),
q("med-p19","medications","Which medication requires hazardous drug handling awareness in many USP <800> contexts?",["methotrexate (certain uses)","polyethylene glycol 3350 OTC","artificial tears","normal saline irrigation"],0,"Methotrexate is commonly on hazardous drug lists depending on use/form.",["hazardous-drugs","safety"],True,True),
q("med-p20","medications","Atenolol is a:",["Beta blocker","ACE inhibitor","ARB","CCB"],0,"Atenolol is a beta-1 selective blocker.",["cardiovascular"],True),
q("med-p21","medications","Which is an example of a Schedule III controlled substance category under federal law?",["Certain anabolic steroids and some codeine combination products","Heroin","Alprazolam","Pregabalin"],0,"Schedule III includes anabolic steroids and specified codeine combos.",["schedules"],True),
q("med-p22","medications","Rivaroxaban is a:",["Factor Xa inhibitor DOAC","Vitamin K antagonist","Antiplatelet","Heparin"],0,"Rivaroxaban (Xarelto) inhibits factor Xa.",["anticoagulant"],True,True),
q("med-p23","medications","Which brand matches generic rosuvastatin?",["Crestor","Lipitor","Zocor","Mevacor"],0,"Crestor is rosuvastatin.",["brand-generic","statins"],True),
q("med-p24","medications","Topiramate is commonly used for:",["Seizure disorders and migraine prevention","Acute gout flare only","OTC allergy relief","Vitamin C deficiency"],0,"Topiramate has anticonvulsant and migraine prophylaxis uses.",["neurology"],True,True),
q("med-p25","medications","Which statement about Schedule I drugs is correct?",["They have no currently accepted medical use federally and high abuse potential","They are OTC cough syrups","They may be prescribed like Schedule II with refills","They include alprazolam"],0,"Schedule I agents lack accepted medical use under federal CSA framing.",["schedules"],True),
q("med-p26","medications","Buspirone is primarily used for:",["Anxiety","Acute bacterial sinusitis","Hyperlipidemia","Insomnia as a Z-drug"],0,"Buspirone is an anxiolytic (not a benzodiazepine).",["psychiatric"],True),
q("med-p27","medications","Which medication is a calcium channel blocker?",["amlodipine","lisinopril","losartan","metoprolol"],0,"Amlodipine is a dihydropyridine CCB.",["cardiovascular"],True),
q("med-p28","medications","Finasteride is commonly used for:",["BPH and male pattern hair loss (indication-specific products)","Acute asthma exacerbation","Hypokalemia","Opioid reversal"],0,"Finasteride inhibits 5-alpha reductase for BPH/alopecia products.",["urology"],True,True),
]
# Federal diagnostic (19)
questions += [
q("fed-001","federal_requirements","Under the Combat Methamphetamine Epidemic Act, which statement about pseudoephedrine sales is most accurate at a high level?",
  ["Daily and 30-day purchase limits apply, with logbook and ID requirements in regulated sellers","There are no federal quantity limits if the product is behind the counter","Pseudoephedrine may be sold freely like regular OTC candy","Only Schedule II prescriptions can include pseudoephedrine"],0,
  "CMEA sets purchase limits and requires ID/logbook processes for regulated sellers.",["pseudoephedrine","CMEA"]),
q("fed-002","federal_requirements","HIPAA's minimum necessary standard generally means:",
  ["Use or disclose only the PHI needed for the intended purpose","Share full charts with any caller who knows the patient name","Post PHI on social media if de-identified by first name only","Technicians may never view any PHI"],0,
  "Minimum necessary limits PHI use/disclosure to what is needed.",["HIPAA","privacy"]),
q("fed-003","federal_requirements","DSCSA primarily addresses:",
  ["Pharmaceutical supply chain security and tracing of certain prescription products","Medicare Part D premium calculations","Technician national certification fees","USP compounding chapter numbering only"],0,
  "The Drug Supply Chain Security Act focuses on tracing and suspect product handling.",["DSCSA","supply-chain"]),
q("fed-004","federal_requirements","A Class I FDA recall typically involves:",
  ["A situation where use/exposure may cause serious adverse health consequences or death","Only labeling typos with no health risk","Voluntary market withdrawals for marketing reasons only","Recalls limited to veterinary feed"],0,
  "Class I recalls involve reasonable probability of serious harm or death.",["recalls","FDA"]),
q("fed-005","federal_requirements","Which DEA form is historically associated with ordering Schedule I/II controlled substances?",
  ["DEA Form 222","DEA Form 41 only for all retail sales","CMS-1500","FDA Form 3500A only"],0,
  "DEA Form 222 (and electronic CSOS) is used for CI/CII ordering.",["DEA","controlled-substances"]),
q("fed-006","federal_requirements","Protected Health Information (PHI) under HIPAA includes:",
  ["Individually identifiable health information held by covered entities/business associates","Only paper prescriptions older than 10 years","Drug prices on a public website with no patient data","DEA registrant numbers of pharmacies alone"],0,
  "PHI is individually identifiable health information in covered contexts.",["HIPAA"]),
q("fed-007","federal_requirements","A Class III recall generally indicates:",
  ["Use/exposure is not likely to cause adverse health consequences","Immediate life-threatening risk in all cases","Automatic criminal liability for technicians","That the product is Schedule I"],0,
  "Class III: not likely to cause adverse health consequences.",["recalls"]),
q("fed-008","federal_requirements","Under DSCSA concepts, a suspect product is one that:",
  ["A trading partner has reason to believe may be counterfeit, diverted, stolen, or otherwise unfit","Has a higher copay than expected","Was dispensed with a counseling offer declined","Is within 90 days of beyond-use date only"],0,
  "Suspect product determinations relate to potential illegitimate supply-chain issues.",["DSCSA"]),
q("fed-009","federal_requirements","Federal controlled substance schedules range from:",
  ["Schedule I (highest abuse / no accepted medical use federally) through Schedule V","Schedule A through Schedule E only","OTC Tier 1 through 3","USP Chapters 795 through 800"],0,
  "CSA schedules are I through V.",["schedules","CSA"]),
q("fed-010","federal_requirements","Which practice best aligns with HIPAA privacy in a retail pharmacy?",
  ["Verify identity appropriately before discussing therapy details and avoid public PHI disclosure","Announce full medication lists over the intercom","Email PHI to personal accounts without safeguards because it is faster","Leave printed labels face-up at the register overnight"],0,
  "Identity verification and safeguarding PHI are core privacy practices.",["HIPAA"]),
]
questions += [
q("fed-011","federal_requirements","Pseudoephedrine purchase limits under federal CMEA for retail sellers are commonly described as:",
  ["3.6 g/day and 9 g/30 days (base) with nuances by package and seller type","Unlimited if the buyer is over 18","1 tablet per lifetime","Only applicable to Schedule II prescriptions"],0,
  "Federal retail limits are commonly taught as 3.6 g/day and 9 g per 30 days.",["pseudoephedrine","CMEA"], needs_review=True),
q("fed-012","federal_requirements","A Class II recall typically means:",
  ["Use/exposure may cause temporary or medically reversible adverse health consequences, or serious harm probability is remote","Certain death in all exposed patients","No FDA involvement ever","Automatic Schedule II reclassification"],0,
  "Class II involves temporary/reversible consequences or remote probability of serious harm.",["recalls"]),
q("fed-013","federal_requirements","Which statement about transferring prescriptions for controlled substances is most accurate at a federal awareness level?",
  ["Federal rules differ by schedule; CII transfers are highly restricted compared with III-V in many contexts","Any controlled prescription may be transferred unlimited times like noncontrols","Technicians may independently authorize interstate CII transfers without a pharmacist","HIPAA bans all transfers"],0,
  "CII transfer rules are stricter; III-V have specific allowance frameworks. Exact current electronic exceptions are QC-sensitive.",["controlled-substances","transfers"], needs_review=True),
q("fed-014","federal_requirements","Covered entities under HIPAA generally include:",
  ["Health plans, health care clearinghouses, and health care providers who transmit certain electronic transactions","Only software vendors","Only cash-pay compounding pharmacies outside the US","Patients themselves as covered entities"],0,
  "The classic covered entity triad is plans, clearinghouses, and specified providers.",["HIPAA"]),
q("fed-015","federal_requirements","Product identifiers used in DSCSA tracing commonly include:",
  ["NDC, serial number, lot, and expiration in a standardized identifier package","Only the patient's date of birth","Only the pharmacy NPI","Only the AWP"],0,
  "DSCSA serialization uses NDC, serial, lot, and expiration elements.",["DSCSA","NDC"]),
q("fed-016","federal_requirements","Which action is inappropriate regarding PHI?",
  ["Discussing a patient's HIV therapy loudly in a crowded waiting area","Using a private counseling area when available","Logging off shared terminals","Using minimum necessary for insurance helpdesk calls"],0,
  "Public discussion of sensitive PHI violates privacy expectations.",["HIPAA"]),
q("fed-017","federal_requirements","Federal law places heroin in which schedule?",
  ["Schedule I","Schedule II","Schedule III","Schedule V"],0,
  "Heroin is Schedule I federally.",["schedules"]),
q("fed-018","federal_requirements","When a recall is issued, pharmacy staff should generally:",
  ["Follow pharmacy policies to identify, quarantine, and process affected stock and notify appropriate parties per protocol","Ignore Class II and III recalls","Destroy all inventory of that manufacturer regardless of lot","Post patient names online for transparency"],0,
  "Recall response is lot/product-specific and policy-driven.",["recalls","quality"]),
q("fed-019","federal_requirements","Which best describes a business associate under HIPAA?",
  ["A person/entity that performs functions involving PHI for a covered entity under a BAA","Any customer who pays cash","Any drug wholesaler employee off duty","A patient's family member"],0,
  "Business associates handle PHI on behalf of covered entities under agreements.",["HIPAA"]),
]
# Paid federal (22)
questions += [
q("fed-p01","federal_requirements","Which statement about OTC pseudoephedrine is true?",["It is kept behind the counter with ID/log requirements in regulated retail settings","It is Schedule II requiring a written Rx always","It has no purchase tracking","It may be sold to minors without restriction federally"],0,"CMEA places PSE behind the counter with ID/log rules.",["pseudoephedrine"],True),
q("fed-p02","federal_requirements","Illegitimate product under DSCSA concepts includes product that:",["Is counterfeit, diverted, or stolen, among other unfit categories","Has a patient-preferred flavor","Was dispensed with a coupon","Has a high deductible plan"],0,"Illegitimate products include counterfeit/diverted/stolen etc.",["DSCSA"],True),
q("fed-p03","federal_requirements","Which is an example of safeguarding PHI?",["Placing discarded labels in secure PHI destruction bins","Throwing labeled vials in open dumpsters","Texting full Rx images to friends for help","Leaving monitors unlocked overnight"],0,"Secure destruction protects PHI.",["HIPAA"],True),
q("fed-p04","federal_requirements","DEA registrant pharmacies must follow controlled substance inventory and recordkeeping rules that generally require:",["Accurate records of receipt and dispensing of controlled substances","No records if the drug is paid cash","Verbal-only logs without dates","Storing CII with OTC candy"],0,"CSA requires controlled substance records.",["DEA","recordkeeping"],True),
q("fed-p05","federal_requirements","Which recall class is most severe regarding health risk?",["Class I","Class II","Class III","Class IV"],0,"Class I is the most severe health-risk recall class.",["recalls"],True),
q("fed-p06","federal_requirements","A valid prescription for a controlled substance generally requires:",["A legitimate medical purpose and issuance by a DEA-authorized practitioner within legal requirements","Only a nurse's verbal request without practitioner involvement","Patient self-certification online","A technician's signature alone"],0,"Corresponding responsibility and valid practitioner issuance are foundational.",["controlled-substances"],True,True),
q("fed-p07","federal_requirements","Which is a HIPAA administrative safeguard concept example?",["Workforce training and access management policies","Leaving charts in rideshare vehicles","Public livestream counseling","Sharing passwords on sticky notes"],0,"Admin safeguards include policies, training, and access management.",["HIPAA"],True),
q("fed-p08","federal_requirements","Transaction information/history/statement concepts in DSCSA relate to:",["Passing tracing data as products move through the supply chain","Patient counseling scripts","Technician certification CE","USP media fill tests"],0,"TI/TH/TS support interoperable tracing.",["DSCSA"],True,True),
q("fed-p09","federal_requirements","Which best describes Schedule V relative to Schedule II?",["Lower abuse potential relative ranking than Schedule II, with accepted medical use","Higher abuse potential than Schedule I","No medical use","Identical refill rules to CII always"],0,"Schedule V has lower relative abuse potential than II through IV.",["schedules"],True),
q("fed-p10","federal_requirements","Patient authorization is generally needed before:",["Disclosing PHI for marketing unrelated to treatment/payment/operations","Submitting claims for treatment payment","Sharing PHI among treatment team members for care","Filling a prescription presented by the patient"],0,"Marketing disclosures often need authorization; TPO has pathways.",["HIPAA"],True,True),
q("fed-p11","federal_requirements","Which agency is primarily associated with drug recalls in the US?",["FDA","DEA only","FCC","USP Convention as a regulatory enforcer"],0,"FDA leads drug recall classification/oversight.",["recalls","FDA"],True),
q("fed-p12","federal_requirements","Federal PSE logbooks generally must capture:",["Purchaser identity elements and product/quantity/date information as required","Patient diagnosis codes only","Only the cashier's favorite color","Physician DEA numbers for OTC sales"],0,"CMEA log elements include ID and transaction details.",["pseudoephedrine"],True),
q("fed-p13","federal_requirements","Corresponding responsibility for controlled prescriptions means:",["Pharmacists share responsibility for ensuring prescriptions are valid/legitimate","Technicians may ignore red flags if sales are high","Wholesalers write prescriptions","Patients set their own schedules"],0,"Corresponding responsibility is a core CSA concept for pharmacists.",["controlled-substances"],True),
q("fed-p14","federal_requirements","Which is NOT an appropriate PHI practice?",["Discussing a famous patient's therapy with the media for publicity","Using encrypted email per policy","Verifying caller identity","Need-to-know access for staff"],0,"Media disclosures of PHI without authorization are improper.",["HIPAA"],True),
q("fed-p15","federal_requirements","Stolen prescription bottles found in the supply chain should be treated under DSCSA concepts as potentially:",["Illegitimate / suspect and handled per investigation procedures","Ordinary overstock","Marketing samples","Non-recall Class IV"],0,"Stolen product is a classic illegitimate category.",["DSCSA"],True),
q("fed-p16","federal_requirements","Which statement about CII prescriptions is generally true federally?",["Refills are not permitted in the same way as noncontrols; issuance/partial fill rules are specialized","They may have unlimited refills for 1 year always","They are OTC with ID","They never require a prescription"],0,"CIIs have strict refill/issuance rules.",["controlled-substances"],True,True),
q("fed-p17","federal_requirements","A notice of privacy practices is associated with:",["HIPAA transparency about how PHI is used and disclosed","DEA Form 106 only","DSCSA serialization barcodes","USP <797> air changes"],0,"NPPs inform patients about PHI practices.",["HIPAA"],True),
q("fed-p18","federal_requirements","Which best matches Class II recall risk language?",["Temporary or medically reversible adverse consequences; serious harm remote","No risk wording exists for Class II","Always fatal","Only applies to devices, never drugs"],0,"Standard Class II definition.",["recalls"],True),
q("fed-p19","federal_requirements","Pharmacy theft of controlled substances generally requires:",["Reporting per DEA/federal and policy requirements (e.g., significant loss pathways)","No reporting if under $5","Only a social media post","Waiting 1 year before any report"],0,"Significant loss/theft has DEA reporting expectations.",["DEA"],True,True),
q("fed-p20","federal_requirements","Which identifier is most directly a drug product packaging code concept used in the US?",["NDC","VIN","ISBN","SSN"],0,"National Drug Code identifies labeler/product/package.",["NDC"],True),
q("fed-p21","federal_requirements","Minimum necessary does NOT typically require:",["Refusing to use any PHI even when needed for dispensing","Limiting chart access by role","Avoiding hallway PHI gossip","Redacting extra pages when faxing to a payer if policy says so"],0,"Minimum necessary still allows needed PHI for treatment/payment/operations.",["HIPAA"],True),
q("fed-p22","federal_requirements","Which is a federal agency primarily enforcing controlled substance laws?",["DEA","FTC for all CSA schedules","Postal Service as sole CSA enforcer","Local school boards"],0,"DEA enforces the CSA.",["DEA"],True),
]
# Patient Safety diagnostic (24)
questions += [
q("saf-001","patient_safety","Which pair is a classic look-alike/sound-alike (LASA) risk example?",
  ["hydralazine and hydroxyzine","amoxicillin and acetaminophen","metformin and montelukast","ibuprofen and insulin glargine"],0,
  "Hydralazine and hydroxyzine are frequently cited LASA pair.",["LASA","error-prevention"]),
q("saf-002","patient_safety","Tall man lettering is primarily used to:",
  ["Differentiate look-alike drug names by capitalizing dissimilar syllables","Increase font size on all OTC labels only","Replace barcode scanning","Indicate Schedule II status"],0,
  "Tall man lettering highlights differing parts of similar names (e.g., hydrALAZINE vs hydrOXYzine).",["LASA","tall-man"]),
q("saf-003","patient_safety","Which medication class is commonly on high-alert lists?",
  ["Insulins","Most topical emollients","Artificial tears","Oral rehydration salts"],0,
  "Insulins are classic high-alert medications.",["high-alert"]),
q("saf-004","patient_safety","Barcode scanning at product selection primarily helps:",
  ["Verify the selected package matches the intended product","Replace the need for a prescription","Calculate days supply automatically in all cases","Satisfy HIPAA training alone"],0,
  "Barcode verification reduces wrong-drug/wrong-strength selection errors.",["error-prevention","barcode"]),
q("saf-005","patient_safety","An independent double-check is most appropriate for:",
  ["Certain high-alert preparations where policy requires a second qualified person to verify","Every OTC candy sale","Only when the patient requests a coupon","Shipping non-pharma sundries"],0,
  "Independent double-checks are a high-alert safety strategy.",["high-alert","error-prevention"]),
q("saf-006","patient_safety","Which is a near-miss in medication safety language?",
  ["An error that was caught before reaching the patient","A correctly dispensed prescription","A paid claim","A Class III recall only"],0,
  "Near-misses are intercepted errors valuable for learning systems.",["quality","reporting"]),
q("saf-007","patient_safety","Which practice reduces LASA errors?",
  ["Separating storage of commonly confused products and using alerts","Storing all bottles alphabetically by color only","Removing NDC from labels","Turning off computer warnings permanently"],0,
  "Physical separation and system alerts mitigate LASA risk.",["LASA","error-prevention"]),
q("saf-008","patient_safety","Concentrated electrolyte vials (e.g., potassium chloride for injection concentrate) are high-alert because:",
  ["Wrong dose/route can be fatal","They are Schedule I","They lack NDCs","They are always oral only"],0,
  "Injectable concentrated electrolytes can cause fatal harm if misused.",["high-alert","electrolytes"]),
q("saf-009","patient_safety","Which is a quality assurance activity?",
  ["Tracking and trending dispensing error reports to improve processes","Deleting error logs to improve metrics","Ignoring recurring near-misses","Disabling barcode scanners to speed workflow"],0,
  "QA uses data from errors/near-misses to improve systems.",["quality"]),
q("saf-010","patient_safety","Which pair is another common LASA example?",
  ["clonidine and clonazepam","lisinopril and losartan only as LASA exclusive pair","water and saline always","gloves and gauze"],0,
  "Clonidine and clonazepam are a known confused name pair.",["LASA"]),
q("saf-011","patient_safety","Hand hygiene in pharmacy operations primarily supports:",
  ["Infection control and product/patient safety","Faster insurance adjudication","DSCSA serialization","DEA Form 222 completion"],0,
  "Hand hygiene is foundational infection control.",["infection-control"]),
q("saf-012","patient_safety","Which action best prevents wrong-patient errors?",
  ["Using two patient identifiers before dispensing counseling or handoff","Calling only first names in a busy waiting room","Skipping DOB checks for regulars","Using bag tags without verification"],0,
  "Two identifiers (e.g., name + DOB) reduce wrong-patient events.",["error-prevention"]),
q("saf-013","patient_safety","Chemotherapy agents are high-alert primarily due to:",
  ["Narrow therapeutic index and severe toxicity risk from errors","Being OTC","Lacking any labeling","Never requiring PPE"],0,
  "Antineoplastics can cause severe harm from dosing/handling errors.",["high-alert","hazardous-drugs"]),
q("saf-014","patient_safety","Which best describes a root cause analysis goal?",
  ["Identify system factors contributing to an event to prevent recurrence","Assign maximum personal blame only","Hide findings from leadership","Increase speed without process review"],0,
  "RCA focuses on systems improvement, not solely blame.",["quality"]),
q("saf-015","patient_safety","Using oral syringes that cannot connect to IV lines is an example of:",
  ["A forcing function / device design to prevent wrong-route errors","A HIPAA safeguard","A DSCSA tracing tool","A Schedule V requirement"],0,
  "Incompatibility of oral syringes with IV ports prevents accidental IV administration of oral liquids.",["error-prevention","high-alert"]),
q("saf-016","patient_safety","Which is appropriate when a dispensing error reaches a patient?",
  ["Follow pharmacy policy for disclosure, documentation, and clinical follow-up with pharmacist involvement","Delete the profile and deny it occurred","Ask the patient to post on social media first","Ignore if the drug was inexpensive"],0,
  "Error response requires policy-based disclosure and documentation.",["quality","reporting"]),
q("saf-017","patient_safety","Look-alike packaging risk is reduced by:",
  ["Careful stock checks and avoiding adjacent storage of confusing packages","Turning bottles upside down randomly","Removing barcodes","Printing labels without drug names"],0,
  "Packaging similarity contributes to selection errors; storage and verification help.",["LASA","error-prevention"]),
q("saf-018","patient_safety","Which medication is commonly considered high-alert in community and hospital lists?",
  ["warfarin","multivitamin gummies","normal saline nasal spray","petroleum jelly"],0,
  "Anticoagulants like warfarin are high-alert.",["high-alert","anticoagulant"]),
q("saf-019","patient_safety","Sterile compounding areas require attention to:",
  ["Aseptic technique and contamination control per applicable USP standards and policy","Eating lunch inside the primary engineering control","Using street clothes without garbing when rushed","Skipping hand hygiene if gloves are used alone always"],0,
  "Aseptic technique and garbing protect sterile preparations.",["infection-control","compounding"], needs_review=True),
q("saf-020","patient_safety","Which is a safe practice for pediatric liquid dosing?",
  ["Using an appropriate metric measuring device and verifying concentration","Estimating with kitchen spoons","Rounding all doses to adult tablet strengths blindly","Ignoring weight-based orders"],0,
  "Metric devices and concentration checks prevent pediatric dosing errors.",["error-prevention","calculations"]),
q("saf-021","patient_safety","Adverse drug event reporting systems are valuable because they:",
  ["Help identify patterns and improve safety culture","Are only for lawsuits","Replace the need for pharmacist judgment","Are illegal under HIPAA always"],0,
  "Reporting supports learning and prevention.",["reporting","quality"]),
q("saf-022","patient_safety","Which strategy helps prevent insulin mix-ups?",
  ["Differentiating products carefully, verifying concentration (U-100 vs U-500), and using barcodes","Storing all insulin pens in one unmarked bin","Assuming all pens are U-100 without checking","Removing carton labels to save space"],0,
  "Concentration and product differentiation are critical for insulin safety.",["high-alert","insulin"]),
q("saf-023","patient_safety","A culture of safety encourages:",
  ["Reporting mistakes and near-misses without fear of unfair punishment for honest system issues","Hiding errors to protect metrics","Punishing only the last person who touched the Rx without system review","Disabling alerts permanently"],0,
  "Just culture balances accountability with system learning.",["quality"]),
q("saf-024","patient_safety","Which is an example of a sound-alike risk?",
  ["Celebrex and Celexa","Water and saline irrigation always","Gloves and syringes","Paper bags and plastic bags"],0,
  "Celebrex (celecoxib) and Celexa (citalopram) are a classic sound-alike pair.",["LASA"]),
]
# Paid patient safety (25)
questions += [
q("saf-p01","patient_safety","Which pair is a LASA risk?",["hydromorphone and morphine","toothpaste and floss","paper and labels","pens and pencils"],0,"Opioid name/strength confusion is a serious LASA/high-alert issue.",["LASA","opioids"],True),
q("saf-p02","patient_safety","Why is U-500 insulin especially high-risk?",["It is five times as concentrated as U-100; dosing confusions can cause severe hypoglycemia","It is Schedule I","It cannot be refrigerated","It has no NDC"],0,"U-500 concentration errors are dangerous.",["insulin","high-alert"],True,True),
q("saf-p03","patient_safety","Which best reduces interruption-related errors?",["Creating no-interruption zones for critical verification steps","Encouraging more simultaneous phone tasks during counting","Removing all SOPs","Playing loud music at the bench"],0,"Protected time for critical tasks reduces slips.",["error-prevention"],True),
q("saf-p04","patient_safety","Medication error reporting should ideally capture:",["What happened, how it was discovered, and contributing factors","Only the patient's insurance ID","Only the technician's personal opinions of coworkers","Nothing in writing"],0,"Structured reports enable analysis.",["reporting","quality"],True),
q("saf-p05","patient_safety","Which is a high-alert category often listed by ISMP?",["Opioids","Most topical steroids of low potency","Saline nasal sprays","Sunscreen"],0,"Opioids are high-alert.",["high-alert"],True),
q("saf-p06","patient_safety","Separating adult and pediatric products on shelves helps prevent:",["Wrong strength/formulation selection errors","HIPAA breaches only","DSCSA failures only","DEA Form errors only"],0,"Segregation reduces mix-ups.",["error-prevention"],True),
q("saf-p07","patient_safety","Which action is unsafe?",["Overriding allergy alerts without pharmacist review when clinically unclear","Stopping to clarify an unclear sig","Scanning barcodes","Asking for date of birth"],0,"Allergy overrides need clinical judgment by the pharmacist.",["error-prevention"],True),
q("saf-p08","patient_safety","Spill management for hazardous drugs should follow:",["Facility hazardous drug policies and appropriate PPE/cleanup kits","Wiping with bare hands only","Using food towels from the breakroom only","Ignoring powders if small"],0,"Hazardous drug spills require trained response.",["hazardous-drugs"],True,True),
q("saf-p09","patient_safety","Which improves verbal order safety when verbal orders are allowed?",["Read-back of the order to confirm","Guessing the drug from partial sounds","Skipping patient identifiers","Whispering unclear doses"],0,"Read-back is a standard communication safety practice.",["error-prevention"],True),
q("saf-p10","patient_safety","Why avoid trailing zeros on dose notations (e.g., 5.0 mg) in safety conventions?",["They can be misread as a 10x dosing error (50 mg)","They are required by DEA","They improve DSCSA tracing","They are HIPAA mandated"],0,"Trailing zeros are discouraged in many safety notation conventions.",["error-prevention"],True),
q("saf-p11","patient_safety","Leading decimal points without a leading zero (e.g., .5 mg) are risky because:",["They may be read as 5 mg","They always mean 50 mg","They are preferred notation","They only apply to OTC"],0,"Use 0.5 mg style to avoid missing the decimal.",["error-prevention"],True),
q("saf-p12","patient_safety","Which is a sterile compounding contamination risk?",["Touching critical sites with non-sterile gloves/garb breaches","Proper hand hygiene and garbing","Disinfecting vials stoppers appropriately","Working within the direct compounding area correctly"],0,"Touch contamination of critical sites risks sterility.",["compounding","infection-control"],True),
q("saf-p13","patient_safety","Patient counseling offers support safety by:",["Catching misunderstandings about directions, allergies, and duplicates","Replacing all pharmacist checks","Eliminating the need for labels","Allowing PHI to be shouted"],0,"Counseling is a final safety net.",["error-prevention"],True),
q("saf-p14","patient_safety","Which best describes failure mode and effects analysis (FMEA)?",["A proactive method to find how a process could fail before harm occurs","Only a post-mortem autopsy of devices","A DEA inventory form","A HIPAA authorization"],0,"FMEA is proactive risk assessment.",["quality"],True),
q("saf-p15","patient_safety","Sound-alike pair example:",["Zyrtec and Zyprexa","Water and ice","Bags and bottles always","Pens and markers"],0,"Zyrtec (cetirizine) and Zyprexa (olanzapine) are a known confused pair.",["LASA"],True),
q("saf-p16","patient_safety","High-alert neuromuscular blockers in hospitals require:",["Special storage/labeling safeguards to prevent accidental administration to non-ventilated patients","OTC shelf placement","No labeling","Patient self-selection"],0,"NMBs can cause fatal paralysis if given erroneously.",["high-alert"],True,True),
q("saf-p17","patient_safety","Which practice supports cold-chain medication safety?",["Monitoring refrigerator temperatures and segregating stock appropriately","Storing vaccines next to lunch foods","Ignoring temperature logs","Freezing all insulin intentionally"],0,"Temperature control protects product integrity.",["quality"],True),
q("saf-p18","patient_safety","Workaround culture (bypassing safety steps routinely) typically:",["Increases latent system risk","Improves long-term safety","Is required by FDA recalls","Is a HIPAA standard"],0,"Chronic workarounds signal system problems and raise risk.",["quality"],True),
q("saf-p19","patient_safety","Which helps prevent wrong-formulation errors (e.g., ER vs IR)?",["Careful NDC/label checks and system alerts for formulation","Assuming ER and IR are interchangeable always","Removing 'ER' from labels for brevity","Ignoring patient reports of different-looking tablets"],0,"Extended-release vs immediate-release mix-ups are harmful.",["error-prevention"],True),
q("saf-p20","patient_safety","A good response after a near-miss includes:",["Documenting and reviewing process gaps","Mocking the staff member publicly","Deleting camera footage always","Increasing speed goals only"],0,"Near-miss learning prevents future harm.",["reporting","quality"],True),
q("saf-p21","patient_safety","Which is an infection control practice for counting trays?",["Cleaning trays regularly per policy, especially after penicillin/sulfonamide counts when required","Never cleaning trays","Using the same tray for hazardous powders without containment","Licking fingers to separate counting papers"],0,"Tray cleaning reduces cross-contamination/allergen residue risk.",["infection-control"],True),
q("saf-p22","patient_safety","Multi-dose vial safety includes:",["Beyond-use dating after opening per policy and aseptic access","Sharing needles between patients","Leaving vials undated indefinitely","Storing opened vials at room temp always regardless of label"],0,"Opened MDVs need dating and aseptic handling.",["infection-control"],True,True),
q("saf-p23","patient_safety","Which reduces distraction during final verification?",["Holding non-urgent questions until the check is complete","Asking multiple questions mid-count simultaneously","Phone scrolling at the bench","Overlapping two verifications on one screen hastily"],0,"Protecting attention during verification reduces slips.",["error-prevention"],True),
q("saf-p24","patient_safety","ISMP is best known in pharmacy safety as:",["An organization that publishes medication safety alerts and best practices","The federal CSA enforcement agency","A PBM adjudication switch","A state board of pharmacy"],0,"ISMP provides safety guidance widely used in pharmacies.",["quality"],True),
q("saf-p25","patient_safety","Which pair can be confused due to abbreviations?",["q.d. and q.i.d. if poorly written","NDC and NPI always meaning the same","DEA and DOB","AWP and AAC always identical"],0,"Dangerous abbreviation confusions are a known error source.",["error-prevention"],True),
]
# Order Entry diagnostic (22) — include verified calcs
questions += [
q("ord-001","order_entry","The sig '1 tab po bid' most nearly means:",
  ["Take one tablet by mouth twice daily","Take one tablet by mouth at bedtime","Instill one tablet in each eye daily","Take one tablespoon twice daily"],0,
  "po = by mouth; bid = twice daily.",["sig-codes"]),
q("ord-002","order_entry","A patient receives 30 tablets with directions: 1 tablet by mouth twice daily. Days supply is:",
  ["15 days","30 days","60 days","7 days"],0,
  "2 tablets/day; 30 tablets / 2 = 15 days.",["days-supply","calculations"]),
q("ord-003","order_entry","An NDC typically encodes which concepts?",
  ["Labeler, product, and package codes","Patient MRN, NPI, and DEA only","Only the AWP and WAC","Only the lot number"],0,
  "NDC segments identify labeler, product, and package size.",["NDC"]),
q("ord-004","order_entry","The abbreviation 'prn' means:",
  ["As needed","Every morning","Before meals","Right eye"],0,
  "prn = pro re nata = as needed.",["sig-codes"]),
q("ord-005","order_entry","A prescription for amoxicillin 250 mg/5 mL: give 5 mL po tid x 10 days. How many mL should be dispensed?",
  ["150 mL","50 mL","100 mL","200 mL"],0,
  "5 mL x 3 times/day x 10 days = 150 mL.",["calculations","days-supply"]),
q("ord-006","order_entry","'gtt' in a sig usually means:",
  ["Drop","Gram","Tablet","Capsule"],0,
  "gtt = gutta/guttae = drop(s).",["sig-codes"]),
q("ord-007","order_entry","A patient takes 1 tablet every 6 hours around the clock. Tablets needed for 30 days are:",
  ["120","30","60","90"],0,
  "24/6 = 4 doses/day; 4 x 30 = 120 tablets.",["calculations","days-supply"]),
q("ord-008","order_entry","'od' as a traditional sig abbreviation most commonly means:",
  ["Right eye","Both ears","Left ear","By mouth"],0,
  "od = oculus dexter = right eye (modern practice prefers plain language).",["sig-codes"]),
q("ord-009","order_entry","If a cream is applied twice daily and a 60 g tube lasts the patient 30 days at that rate, approximate daily use is:",
  ["2 g/day","1 g/day","5 g/day","10 g/day"],0,
  "60 g / 30 days = 2 g/day.",["calculations","days-supply"]),
q("ord-010","order_entry","Which claim rejection concept means the drug is not covered under the plan's formulary (general awareness)?",
  ["Non-formulary / product not covered style reject","Wrong days supply always coded as refill too soon only","NDC not found meaning patient deceased","Prior auth approved"],0,
  "Non-formulary rejects indicate coverage/formulary issues.",["insurance"]),
q("ord-011","order_entry","'ac' means:",
  ["Before meals","After meals","At bedtime","Right ear"],0,
  "ac = ante cibum = before meals.",["sig-codes"]),
q("ord-012","order_entry","Doctor orders 500 mg; stock is 250 mg tablets. Tablets per dose:",
  ["2","1","4","0.5"],0,
  "500/250 = 2 tablets.",["calculations"]),
q("ord-013","order_entry","A 10 mL vial contains 100 mg/mL. How many mg in 2.5 mL?",
  ["250 mg","100 mg","25 mg","1000 mg"],0,
  "100 mg/mL x 2.5 mL = 250 mg.",["calculations"]),
q("ord-014","order_entry","'hs' traditionally means:",
  ["At bedtime","Every hour","Left eye","As directed"],0,
  "hs = hora somni = at bedtime.",["sig-codes"]),
q("ord-015","order_entry","Days supply for 90 capsules, 1 cap po tid:",
  ["30 days","90 days","45 days","15 days"],0,
  "3 capsules/day; 90/3 = 30 days.",["days-supply","calculations"]),
q("ord-016","order_entry","Which best describes a refill-too-soon rejection?",
  ["The plan believes insufficient time has elapsed based on prior fill days supply","The NDC is invalid","The patient name mismatches always","The drug is Schedule I"],0,
  "Refill-too-soon is a timing/adjudication issue.",["insurance"]),
q("ord-017","order_entry","Convert 1 teaspoonful (using common pharmacy conversion) to mL:",
  ["5 mL","15 mL","30 mL","1 mL"],0,
  "1 tsp = 5 mL in common pharmacy conversions.",["calculations"]),
q("ord-018","order_entry","'os' traditionally means:",
  ["Left eye","Right eye","Both ears","By mouth"],0,
  "os = oculus sinister = left eye.",["sig-codes"]),
q("ord-019","order_entry","A prescription written for 1 tablet daily has 2 refills authorized for a noncontrolled drug. Including the original fill, maximum fills indicated are:",
  ["3","2","1","4"],0,
  "Original + 2 refills = 3 total fills if all used.",["refills"]),
q("ord-020","order_entry","Weight-based dose: 10 mg/kg for a 20 kg child. Total dose:",
  ["200 mg","20 mg","10 mg","2 mg"],0,
  "10 mg/kg x 20 kg = 200 mg.",["calculations"]),
q("ord-021","order_entry","'ou' traditionally means:",
  ["Both eyes","Right ear","Left ear","Each nostril only"],0,
  "ou = oculus uterque = both eyes.",["sig-codes"]),
q("ord-022","order_entry","How many 5 mg tablets are needed for a total daily dose of 20 mg given as equal doses twice daily for 14 days?",
  ["56","28","14","112"],0,
  "20 mg/day = 4 tablets/day of 5 mg; 4 x 14 = 56.",["calculations","days-supply"]),
]
# Paid order entry (25)
questions += [
q("ord-p01","order_entry","'pc' means:",["After meals","Before meals","At bedtime","Each ear"],0,"pc = post cibum = after meals.",["sig-codes"],True),
q("ord-p02","order_entry","Days supply for 120 mL, 5 mL po bid:",["12 days","24 days","10 days","30 days"],0,"10 mL/day; 120/10 = 12 days.",["days-supply","calculations"],True),
q("ord-p03","order_entry","1 tablespoon (common pharmacy conversion) equals:",["15 mL","5 mL","30 mL","3 mL"],0,"1 tbsp = 15 mL.",["calculations"],True),
q("ord-p04","order_entry","'au' traditionally means:",["Both ears","Both eyes","Left eye","Right eye"],0,"au = auris uterque = both ears.",["sig-codes"],True),
q("ord-p05","order_entry","Stock solution is 20 mg/mL; needed dose is 40 mg. Volume to draw:",["2 mL","0.5 mL","4 mL","20 mL"],0,"40/20 = 2 mL.",["calculations"],True),
q("ord-p06","order_entry","Which NDC segment typically identifies the manufacturer/labeler?",["The first segment (labeler code)","The patient's ZIP code","The DEA schedule number alone","The claim authorization number"],0,"Labeler code is the first NDC segment.",["NDC"],True),
q("ord-p07","order_entry","'qid' means:",["Four times daily","Every other day","Once weekly","Every hour"],0,"qid = four times daily.",["sig-codes"],True),
q("ord-p08","order_entry","A 30-day supply of a drug taken once daily is transferred early at day 10 for vacation. Which statement is most accurate at a general tech level?",["Plan rules and pharmacy policy determine early fill eligibility; adjudication may reject refill-too-soon","Federal law always bans any early fill for all drugs","Technicians may override any payer rule without pharmacist","Days supply math is irrelevant to rejects"],0,"Early fills depend on payer rules and policy.",["insurance","refills"],True),
q("ord-p09","order_entry","Percent strength 5% w/v means:",["5 g of drug per 100 mL of solution","5 mg per 5 mL only","5 mL per 100 g always","50 g per mL"],0,"% w/v is grams per 100 mL.",["calculations"],True,True),
q("ord-p10","order_entry","How many grams of drug in 200 mL of a 5% w/v solution?",["10 g","5 g","1 g","20 g"],0,"5 g/100 mL => 10 g in 200 mL.",["calculations"],True),
q("ord-p11","order_entry","'ad' traditionally means:",["Right ear","Left ear","Both eyes","Right eye"],0,"ad = auris dextra = right ear.",["sig-codes"],True),
q("ord-p12","order_entry","Ratio strength 1:1000 as a percent is:",["0.1%","1%","10%","0.01%"],0,"1/1000 = 0.001 = 0.1%.",["calculations"],True),
q("ord-p13","order_entry","If directions are 2 puffs inhaled q6h, puffs per day (around the clock):",["8","2","4","6"],0,"24/6 = 4 dosing times x 2 puffs = 8.",["calculations","sig-codes"],True),
q("ord-p14","order_entry","'as' traditionally means:",["Left ear","Right ear","Both eyes","Left eye"],0,"as = auris sinistra = left ear.",["sig-codes"],True),
q("ord-p15","order_entry","IV flow: 1000 mL over 8 hours. mL/hour rate:",["125 mL/hr","100 mL/hr","80 mL/hr","250 mL/hr"],0,"1000/8 = 125 mL/hr.",["calculations"],True),
q("ord-p16","order_entry","A prior authorization reject generally means:",["The plan requires additional approval before covering the product","The pharmacy NDC database is offline forever","The patient must pay cash only always without options","The drug is Schedule I"],0,"PA rejects require plan approval workflows.",["insurance"],True),
q("ord-p17","order_entry","Days supply for 1 inhaler with 200 actuations, 2 puffs bid:",["50 days","100 days","25 days","200 days"],0,"4 puffs/day; 200/4 = 50 days.",["days-supply","calculations"],True),
q("ord-p18","order_entry","'stat' means:",["Immediately","Weekly","Monthly","As needed only"],0,"stat = immediately.",["sig-codes"],True),
q("ord-p19","order_entry","Convert 0.5 g to mg:",["500 mg","50 mg","5 mg","5000 mg"],0,"1 g = 1000 mg; 0.5 g = 500 mg.",["calculations"],True),
q("ord-p20","order_entry","Which best describes package size selection during product choice?",["Match the ordered quantity/NDC package appropriately while checking strength and form","Always pick the largest bottle regardless of Rx","Ignore NDC package codes","Choose based on bottle color only"],0,"Correct package/strength/form selection is core order processing.",["NDC","error-prevention"],True),
q("ord-p21","order_entry","Dose is 7.5 mg; tablets are 2.5 mg. Tablets per dose:",["3","2","1","4"],0,"7.5/2.5 = 3.",["calculations"],True),
q("ord-p22","order_entry","'ung' traditionally refers to:",["Ointment","Spray","Patch","Capsule"],0,"ung = unguentum = ointment.",["sig-codes"],True),
q("ord-p23","order_entry","A liquid is 125 mg/5 mL. How many mL provide 250 mg?",["10 mL","5 mL","2 mL","15 mL"],0,"125 mg per 5 mL => 250 mg needs 10 mL.",["calculations"],True),
q("ord-p24","order_entry","Which is true about e-prescribing controlled substances at a high level?",["Federal EPCS rules require authentication/security controls beyond ordinary e-Rx","Any email from a doctor is sufficient","Paper is banned for all schedules always","Technicians can approve EPCS enrollment alone"],0,"EPCS has specific security requirements.",["controlled-substances","order-entry"],True,True),
q("ord-p25","order_entry","If a patient uses 1 drop in each eye three times daily from a 5 mL bottle, approximate days supply if 20 drops ≈ 1 mL:",["About 16 days","About 5 days","About 50 days","About 2 days"],0,"6 drops/day; 5 mL x 20 drops/mL = 100 drops; 100/6 ≈ 16.7 days.",["calculations","days-supply"],True,True),
]

def ts_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

def emit_question(obj: dict) -> str:
    choices = ", ".join(json_str(c) for c in obj["choices"])
    tags = ", ".join(json_str(t) for t in obj["topicTags"])
    lines = [
        "  {",
        f"    id: {json_str(obj['id'])},",
        f"    domain: {json_str(obj['domain'])},",
        f"    stem: {json_str(obj['stem'])},",
        f"    choices: [{choices}],",
        f"    correctIndex: {obj['correctIndex']},",
        f"    rationale: {json_str(obj['rationale'])},",
        f"    topicTags: [{tags}],",
    ]
    if obj.get("paidOnly"):
        lines.append("    paidOnly: true,")
    if obj.get("needsReview"):
        lines.append("    needsReview: true,")
    lines.append("  }")
    return "\n".join(lines)

def json_str(s: str) -> str:
    import json as _json
    return _json.dumps(s, ensure_ascii=False)

def write_module(filename: str, export_name: str, items: list):
    body = ",\n".join(emit_question(i) for i in items)
    content = (
        'import type { Question } from "./types";\n\n'
        f"export const {export_name}: Question[] = [\n{body}\n];\n"
    )
    (OUT / filename).write_text(content)
    print(f"wrote {filename}: {len(items)}")

# Split and write
diag = [x for x in questions if not x.get("paidOnly")]
paid = [x for x in questions if x.get("paidOnly")]

by_domain = {}
for item in questions:
    by_domain.setdefault(item["domain"], []).append(item)

# Better export names
name_map = {
    "medications": ("medications.ts", "MEDICATIONS_QUESTIONS"),
    "federal_requirements": ("federal-requirements.ts", "FEDERAL_QUESTIONS"),
    "patient_safety": ("patient-safety.ts", "SAFETY_QUESTIONS"),
    "order_entry": ("order-entry.ts", "ORDER_QUESTIONS"),
}
for domain, items in by_domain.items():
    fn, en = name_map[domain]
    write_module(fn, en, items)

# index
index = '''import type { DomainId, Question } from "./types";
import { DIAGNOSTIC_COUNTS } from "./types";
import { MEDICATIONS_QUESTIONS } from "./medications";
import { FEDERAL_QUESTIONS } from "./federal-requirements";
import { SAFETY_QUESTIONS } from "./patient-safety";
import { ORDER_QUESTIONS } from "./order-entry";

export * from "./types";

export const ALL_QUESTIONS: Question[] = [
  ...MEDICATIONS_QUESTIONS,
  ...FEDERAL_QUESTIONS,
  ...SAFETY_QUESTIONS,
  ...ORDER_QUESTIONS,
];

export function getDiagnosticPool(): Question[] {
  return ALL_QUESTIONS.filter((q) => !q.paidOnly);
}

export function getPaidQuestions(): Question[] {
  return ALL_QUESTIONS.filter((q) => q.paidOnly);
}

export function getQuestionsByDomain(domain: DomainId, opts?: { includePaid?: boolean; paidOnly?: boolean }): Question[] {
  return ALL_QUESTIONS.filter((q) => {
    if (q.domain !== domain) return false;
    if (opts?.paidOnly) return !!q.paidOnly;
    if (opts?.includePaid) return true;
    return !q.paidOnly;
  });
}

/** Build a 100-question diagnostic matching EXAM_BLUEPRINT counts (stable shuffle by seed). */
export function buildDiagnosticSet(seed = 42): Question[] {
  const pool = getDiagnosticPool();
  const result: Question[] = [];
  for (const [domain, count] of Object.entries(DIAGNOSTIC_COUNTS) as [DomainId, number][]) {
    const domainQs = pool.filter((q) => q.domain === domain);
    if (domainQs.length < count) {
      throw new Error(`Not enough diagnostic questions for ${domain}: have ${domainQs.length}, need ${count}`);
    }
    result.push(...seededShuffle(domainQs, seed + domain.length).slice(0, count));
  }
  return seededShuffle(result, seed);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
'''
(OUT / "index.ts").write_text(index)

# summary
from collections import Counter
diag_c = Counter(q["domain"] for q in diag)
paid_c = Counter(q["domain"] for q in paid)
print("DIAGNOSTIC", dict(diag_c), "total", len(diag))
print("PAID", dict(paid_c), "total", len(paid))
print("TOTAL", len(questions))
print("needsReview", sum(1 for q in questions if q.get("needsReview")))

# Also write JSON for integrity tooling
import json
(OUT / "bank.json").write_text(json.dumps(questions, indent=2, ensure_ascii=False))
print("wrote bank.json", len(questions))
