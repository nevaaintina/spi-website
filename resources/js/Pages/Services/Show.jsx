import { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* -------------------------------------------------------------------------- */
/* SVG ICONS PER KATEGORI & SUB-LAYANAN                                        */
/* -------------------------------------------------------------------------- */
const IconWrench = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z"/></svg>;
const IconGear = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9c.13.36.36.68.66.93.3.24.53.56.66.93A1.65 1.65 0 0 0 21.91 11H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>;
const IconTruck = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-5l-3-4h-5v9h2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
const IconSiren = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2v3M4.93 4.93l2.12 2.12M2 12h3M20 12h3M19.07 4.93l-2.12 2.12"/><path d="M6 19a1 1 0 0 1-1-1v-5a7 7 0 0 1 14 0v5a1 1 0 0 1-1 1H6Z"/><path d="M4 19h16v2H4z"/></svg>;
const IconShield = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const IconChevronRight = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6"/></svg>;
const IconArrowRight = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
const IconArrowLeft = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>;
const IconCheckCircle = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const IconClipboard = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>;
const IconHeadset = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M20 13v3a2 2 0 0 1-2 2h-1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M15 18a2 2 0 0 1-2 2h-2"/></svg>;

/* -------------------------------------------------------------------------- */
/* DATABASE 5 KATEGORI & 18 SUB-LAYANAN LENGKAP                                */
/* -------------------------------------------------------------------------- */
const SERVICES_DATA = {
    'maintenance-repair': {
        title: 'Maintenance & Repair',
        description: 'Reliable maintenance and repair solutions designed to keep your heavy equipment operating at peak performance.',
        items: [
            {
                id: 'preventive-maintenance',
                num: '01',
                name: 'Preventive Maintenance',
                icon: IconWrench,
                description: 'Scheduled maintenance programs designed to prevent unexpected failures, maintain optimal equipment condition, and maximize operational uptime.',
                steps: [
                    { title: 'Scheduled Inspection', desc: 'Regular inspection to detect potential issues early.' },
                    { title: 'Component Check', desc: 'Comprehensive check of critical components and systems.' },
                    { title: 'Maintenance Planning', desc: 'Structured maintenance plans tailored to your equipment needs.' },
                    { title: 'Performance Optimization', desc: 'Ensure equipment operates at optimal performance.' }
                ],
                whatWeDo: [
                    'Fluid analysis and replacement',
                    'Filter inspection and replacement',
                    'Wear and tear inspection',
                    'System performance check',
                    'Software & parameter update',
                    'Detailed maintenance reporting'
                ],
                benefits: [
                    'Reduce unexpected breakdowns',
                    'Extend equipment lifespan',
                    'Lower repair costs',
                    'Increase operational efficiency'
                ]
            },
            {
                id: 'corrective-maintenance',
                num: '02',
                name: 'Corrective Maintenance',
                icon: IconGear,
                description: 'Targeted repairs and component replacements executed prior to catastrophic system failure to restore operational reliability.',
                steps: [
                    { title: 'Fault Identification', desc: 'Precise isolation of failing or degraded parts.' },
                    { title: 'Component Sourcing', desc: 'Fast turnaround for genuine replacement parts.' },
                    { title: 'Precision Repair', desc: 'Expert restoration by certified field technicians.' },
                    { title: 'Post-Repair Test', desc: 'Rigorous validation before returning unit to duty.' }
                ],
                whatWeDo: [
                    'Component replacement & alignment',
                    'Structural & hydraulic seal repair',
                    'System calibration & re-tuning',
                    'Electrical harness restoration'
                ],
                benefits: [
                    'Prevents catastrophic machine failure',
                    'Restores original equipment spec',
                    'Minimizes overall downtime duration'
                ]
            },
            {
                id: 'breakdown-service',
                num: '03',
                name: 'Breakdown Service',
                icon: IconTruck,
                description: 'Rapid-response on-site emergency field repairs dispatched directly to your location when equipment stops unexpectedly.',
                steps: [
                    { title: 'Rapid Dispatch', desc: 'Field support teams mobilized on short notice.' },
                    { title: 'On-Site Triage', desc: 'Immediate diagnostic on the active jobsite.' },
                    { title: 'Emergency Repair', desc: 'Fast fix to safely resume core operations.' },
                    { title: 'Follow-up Plan', desc: 'Comprehensive report for long-term resolution.' }
                ],
                whatWeDo: [
                    'Mobile workshop unit deployment',
                    'Emergency hose & hydraulic fix',
                    'Engine & transmission field bypass/repair',
                    'Safety compliance check'
                ],
                benefits: [
                    'Minimal jobsite interruption',
                    'Direct expertise at remote sites',
                    'Immediate operational recovery'
                ]
            },
            {
                id: 'emergency-service',
                num: '04',
                name: 'Emergency Service',
                icon: IconSiren,
                description: '24/7 dedicated support team ready for immediate intervention during critical operational emergencies.',
                steps: [
                    { title: '24/7 Hotline', desc: 'Instant connection to senior technicians.' },
                    { title: 'Remote Guidance', desc: 'Immediate troubleshooting via telemetry or phone.' },
                    { title: 'Field Mobilization', desc: 'Priority field dispatch for high-severity issues.' },
                    { title: 'Status Tracking', desc: 'Real-time updates until operational recovery.' }
                ],
                whatWeDo: [
                    'Round-the-clock technician availability',
                    'Priority emergency spare parts access',
                    'Critical failure containment',
                    'Executive status reporting'
                ],
                benefits: [
                    'Maximum peace of mind 24/7',
                    'Guaranteed rapid response SLA',
                    'Reduced risk of costly delays'
                ]
            },
            {
                id: 'warranty-repair',
                num: '05',
                name: 'Warranty Repair',
                icon: IconShield,
                description: 'Official manufacturer-aligned repairs executed with genuine OEM parts under standard coverage guidelines.',
                steps: [
                    { title: 'Claim Assessment', desc: 'Verification of warranty status and failure scope.' },
                    { title: 'OEM Diagnostics', desc: 'Factory-approved diagnostic protocols.' },
                    { title: 'Genuine Parts', desc: 'Use of 100% certified OEM components.' },
                    { title: 'Official Sign-off', desc: 'Documented completion for factory record.' }
                ],
                whatWeDo: [
                    'Warranty claim documentation & filing',
                    'OEM genuine component replacement',
                    'Factory-certified procedure execution',
                    'Full maintenance log update'
                ],
                benefits: [
                    'Zero out-of-pocket for covered parts',
                    'Protects machinery resale value',
                    'Full compliance with OEM standards'
                ]
            }
        ]
    },
    'installation-commissioning': {
        title: 'Installation & Commissioning',
        description: 'Professional assembly, installation, and rigorous testing to ensure your equipment operates safely and efficiently from day one.',
        items: [
            {
                id: 'machine-installation',
                num: '01',
                name: 'Machine Installation',
                icon: IconGear,
                description: 'Complete field assembly and structural mounting of heavy machinery in accordance with OEM engineering standards.',
                steps: [
                    { title: 'Site Inspection', desc: 'Preparing installation base and surrounding site.' },
                    { title: 'Assembly & Mounting', desc: 'Precision positioning and structural anchoring.' },
                    { title: 'System Connection', desc: 'Electrical, hydraulic, and mechanical linkage.' },
                    { title: 'Safety Audit', desc: 'Pre-operational safety verification.' }
                ],
                whatWeDo: [
                    'Structural anchoring & alignment',
                    'Hydraulic & pneumatic connection',
                    'Electrical & ECU wiring integration',
                    'Pre-start safety checklist execution'
                ],
                benefits: [
                    'Guaranteed installation safety',
                    'Avoids early mechanical strain',
                    'Ensures full OEM compliance'
                ]
            },
            {
                id: 'commissioning',
                num: '02',
                name: 'Commissioning',
                icon: IconWrench,
                description: 'Systematic testing under loaded and unloaded conditions to certify full operational readiness.',
                steps: [
                    { title: 'Dry Run Testing', desc: 'Initial component checks without load.' },
                    { title: 'Load Validation', desc: 'Stress testing under operational parameters.' },
                    { title: 'Calibration', desc: 'Fine-tuning hydraulic pressures and controls.' },
                    { title: 'Handover Certification', desc: 'Official documentation sign-off.' }
                ],
                whatWeDo: [
                    'Full cycle functional testing',
                    'Hydraulic pressure calibration',
                    'Operator safety orientation',
                    'Commissioning report generation'
                ],
                benefits: [
                    'Immediate peak efficiency on day one',
                    'Risk reduction during initial launch',
                    'Validated performance metrics'
                ]
            }
        ]
    },
    'overhaul-rebuild': {
        title: 'Overhaul & Rebuild',
        description: 'Comprehensive mechanical restoration to breathe a second life into major assemblies and entire fleet machines.',
        items: [
            {
                id: 'overhaul',
                num: '01',
                name: 'Overhaul',
                icon: IconGear,
                description: 'Complete teardown, inspection, re-machining, and rebuilding of critical major components like engines and transmissions.',
                steps: [
                    { title: 'Full Teardown', desc: 'Disassembly to individual component level.' },
                    { title: 'Crack & Wear Check', desc: 'Precision measurement & non-destructive testing.' },
                    { title: 'Re-machining', desc: 'Restoring tolerances to original OEM spec.' },
                    { title: 'Bench Testing', desc: 'Dynamometer testing prior to installation.' }
                ],
                whatWeDo: [
                    'Engine & transmission complete rebuild',
                    'Hydraulic pump & motor overhaul',
                    'Precision grinding & honing',
                    'Dynamometer performance testing'
                ],
                benefits: [
                    'Restores original torque & power',
                    'Extends asset service life significantly',
                    'Substantially cheaper than new unit'
                ]
            },
            {
                id: 'rebuild',
                num: '02',
                name: 'Rebuild',
                icon: IconWrench,
                description: 'Complete machine restoration from frame to cab, renewing all worn systems for second-life operation.',
                steps: [
                    { title: 'Bare Frame Strip', desc: 'Stripping unit down to main chassis.' },
                    { title: 'Structural Repair', desc: 'Welding, reinforcement, and line boring.' },
                    { title: 'Total Renewal', desc: 'New wiring, hoses, cab, and drive line.' },
                    { title: 'Final Inspection', desc: 'Full testing matching new machine standards.' }
                ],
                whatWeDo: [
                    'Frame inspection & structural repair',
                    'Complete wiring harness replacement',
                    'Cabin refurbishing & controls update',
                    'New paint & protective coating'
                ],
                benefits: [
                    'Like-new condition at 40-60% of new cost',
                    'Updated safety & control technologies',
                    'New machine warranty coverage'
                ]
            }
        ]
    },
    'inspection-testing': {
        title: 'Inspection & Testing',
        description: 'Advanced diagnostic technologies and analytical testing to identify hidden issues and optimize equipment health.',
        items: [
            {
                id: 'machine-inspection',
                num: '01',
                name: 'Machine Inspection',
                icon: IconClipboard,
                description: 'Standardized physical and operational health assessments conducted on-site by certified inspectors.',
                steps: [
                    { title: 'Visual Check', desc: 'Detailed walk-around for leaks and cracks.' },
                    { title: 'Operational Test', desc: 'Checking control response and gauges.' },
                    { title: 'Measurement', desc: 'Undercarriage & pin/bushing wear checks.' },
                    { title: 'Health Score', desc: 'Comprehensive condition evaluation report.' }
                ],
                whatWeDo: [
                    'Walk-around structural & leak check',
                    'Undercarriage wear measurement',
                    'Implement & attachment alignment check',
                    'Diagnostic fault log reading'
                ],
                benefits: [
                    'Clear insight into machine condition',
                    'Informed budget planning for repairs',
                    'Prevents unexpected structural failure'
                ]
            },
            {
                id: 'fleet-inspection',
                num: '02',
                name: 'Fleet Inspection',
                icon: IconTruck,
                description: 'Fleet-wide condition auditing to prioritize maintenance schedules and optimize overall capital allocation.',
                steps: [
                    { title: 'Fleet Audit', desc: 'Systematic evaluation of all active assets.' },
                    { title: 'Condition Ranking', desc: 'Categorizing units by urgency of service.' },
                    { title: 'Cost Projection', desc: 'Estimating short and long-term maintenance needs.' },
                    { title: 'Strategy Plan', desc: 'Delivering executive fleet health roadmap.' }
                ],
                whatWeDo: [
                    'Multi-unit comparative analysis',
                    'Component life expectancy modeling',
                    'Maintenance budget optimization',
                    'Fleet readiness reporting'
                ],
                benefits: [
                    'Maximized fleet availability',
                    'Optimized capital expenditures',
                    'Streamlined spare parts inventory'
                ]
            },
            {
                id: 'oil-analysis',
                num: '03',
                name: 'Oil Analysis',
                icon: IconGear,
                description: 'Laboratory fluid sampling to detect microscopic wear particles, contaminants, and fluid degradation early.',
                steps: [
                    { title: 'Fluid Sampling', desc: 'Clean extraction of oil from active compartments.' },
                    { title: 'Lab Spectrum Test', desc: 'Analyzing element parts-per-million (PPM).' },
                    { title: 'Viscosity Check', desc: 'Testing lubrication stability under heat.' },
                    { title: 'Trend Analysis', desc: 'Comparing against historical machine data.' }
                ],
                whatWeDo: [
                    'Spectrometric wear metal analysis',
                    'Contamination detection (water, fuel, soot)',
                    'Viscosity and additive health testing',
                    'Actionable lab recommendations report'
                ],
                benefits: [
                    'Detects internal wear before failure occurs',
                    'Optimizes fluid drain intervals',
                    'Saves thousands on major overhauls'
                ]
            },
            {
                id: 'hydraulic-testing',
                num: '04',
                name: 'Hydraulic Testing',
                icon: IconWrench,
                description: 'Precision flow and pressure diagnostics to identify pump wear, valve leakage, and cylinder bypass.',
                steps: [
                    { title: 'Flow Meter Test', desc: 'Measuring actual GPM output under load.' },
                    { title: 'Pressure Relief Test', desc: 'Verifying main & port relief valve settings.' },
                    { title: 'Cylinder Drift Test', desc: 'Checking internal seal integrity.' },
                    { title: 'Thermal Imaging', desc: 'Spotting restriction heat buildup.' }
                ],
                whatWeDo: [
                    'Hydraulic pump flow & pressure test',
                    'Relief valve calibration',
                    'Cylinder bypass leakage test',
                    'System temperature profiling'
                ],
                benefits: [
                    'Restores original cycle times',
                    'Reduces fuel consumption',
                    'Extends hydraulic component life'
                ]
            },
            {
                id: 'electrical-diagnosis',
                num: '05',
                name: 'Electrical Diagnosis',
                icon: IconGear,
                description: 'Advanced troubleshooting of electronic control units, sensors, wiring harnesses, and charging systems.',
                steps: [
                    { title: 'CAN-Bus Scan', desc: 'Reading active and logged diagnostic codes.' },
                    { title: 'Sensor Validation', desc: 'Testing voltage and resistance parameters.' },
                    { title: 'Harness Tracing', desc: 'Locating shorts, opens, and ground faults.' },
                    { title: 'ECU Reflashing', desc: 'Updating firmware to current OEM specs.' }
                ],
                whatWeDo: [
                    'Electronic controller diagnostic scan',
                    'Wire harness continuity & ground check',
                    'Alternator & battery load testing',
                    'Sensor calibration & replacement'
                ],
                benefits: [
                    'Resolves intermittent electrical glitches',
                    'Prevents electronic module burnout',
                    'Ensures accurate sensor readings'
                ]
            },
            {
                id: 'engine-diagnosis',
                num: '06',
                name: 'Engine Diagnosis',
                icon: IconWrench,
                description: 'Digital diagnostic analysis of engine performance, fuel injection, compression, and emission systems.',
                steps: [
                    { title: 'Digital Scan', desc: 'Interrogating engine ECM for error codes.' },
                    { title: 'Cylinder Cutout', desc: 'Identifying weak injectors or cylinders.' },
                    { title: 'Blow-By Test', desc: 'Measuring piston ring wear and blow-by.' },
                    { title: 'Turbo Boost Check', desc: 'Verifying intake air pressure and delivery.' }
                ],
                whatWeDo: [
                    'Electronic engine diagnostic scan',
                    'Fuel injector balance & cutout test',
                    'Turbocharger boost & exhaust backpressure check',
                    'Emission system diagnostic (EGR/DPF/DEF)'
                ],
                benefits: [
                    'Restores engine horsepower',
                    'Improves fuel economy',
                    'Reduces black smoke & emissions'
                ]
            },
            {
                id: 'machine-health-check',
                num: '07',
                name: 'Machine Health Check',
                icon: IconClipboard,
                description: 'Comprehensive 360-degree diagnostic evaluation combining visual, electronic, and fluid analysis.',
                steps: [
                    { title: 'Multi-Point Audit', desc: 'Evaluating all primary machine subsystems.' },
                    { title: 'Data Log Reading', desc: 'Extracting historical operational parameters.' },
                    { title: 'Fluid Inspection', desc: 'Rapid field fluid check for contamination.' },
                    { title: 'Health Index', desc: 'Delivering unified health index rating.' }
                ],
                whatWeDo: [
                    'Integrated multi-system inspection',
                    'Operator duty cycle data extraction',
                    'Safety system validation',
                    'Prioritized maintenance advisory'
                ],
                benefits: [
                    'Complete overview of asset health',
                    'Prevents compound system failures',
                    'Maximizes equipment resale value'
                ]
            }
        ]
    },
    'contract-consulting': {
        title: 'Contract & Consulting',
        description: 'Tailored maintenance agreements and expert engineering consultation to secure long-term operational profitability.',
        items: [
            {
                id: 'annual-maintenance-contract',
                num: '01',
                name: 'Annual Maintenance Contract',
                icon: IconShield,
                description: 'Customized yearly service contracts providing fixed maintenance budgets and guaranteed technician response times.',
                steps: [
                    { title: 'Fleet Assessment', desc: 'Analyzing operational hours and environment.' },
                    { title: 'Custom SLA Plan', desc: 'Defining response times and routine intervals.' },
                    { title: 'Scheduled Execution', desc: 'Proactive servicing per agreed timetable.' },
                    { title: 'Quarterly Review', desc: 'Auditing downtime reduction and cost savings.' }
                ],
                whatWeDo: [
                    'Scheduled preventive maintenance management',
                    'Guaranteed emergency technician response',
                    'Discounted genuine spare parts pricing',
                    'Dedicated account technical manager'
                ],
                benefits: [
                    'Predictable annual maintenance cost',
                    'Priority service technician dispatch',
                    'Highest achievable machine availability'
                ]
            },
            {
                id: 'technical-consultation',
                num: '02',
                name: 'Technical Consultation',
                icon: IconClipboard,
                description: 'Expert engineering advice on machine selection, application matching, fleet optimization, and site efficiency.',
                steps: [
                    { title: 'Requirement Audit', desc: 'Evaluating site conditions and payload targets.' },
                    { title: 'Application Match', desc: 'Recommending ideal machine specs & attachments.' },
                    { title: 'Efficiency Analysis', desc: 'Calculating fuel-per-ton and cycle times.' },
                    { title: 'Final Advisory', desc: 'Presenting actionable engineering recommendations.' }
                ],
                whatWeDo: [
                    'Site application & machine matching study',
                    'Fuel consumption optimization audit',
                    'Fleet size & ratio recommendations',
                    'Operator technical training programs'
                ],
                benefits: [
                    'Prevents over or under-specifying machinery',
                    'Reduces cost per ton moved',
                    'Improves jobsite safety and productivity'
                ]
            }
        ]
    }
};

export default function Show({ slug }) {
    // Membaca slug dari props atau window location
    const pathSlug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
    const currentSlug = slug || pathSlug || 'maintenance-repair';

    // Cari kategori, fallback ke maintenance-repair jika tak ada
    const categoryData = SERVICES_DATA[currentSlug] || SERVICES_DATA['maintenance-repair'];

    // State untuk sub-layanan yang sedang terpilih
    const [selectedItem, setSelectedItem] = useState(categoryData.items[0]);

    // Reset item pilihan jika kategori berubah dari URL
    useEffect(() => {
        if (categoryData && categoryData.items.length > 0) {
            setSelectedItem(categoryData.items[0]);
        }
    }, [currentSlug]);

    if (!categoryData) return null;

    return (
        <>
            <Head title={`${categoryData.title} - PT Servistama Pro Indonesia`} />

            <div className="min-h-screen bg-[#F8FAFC]">
                <Navbar />

                {/* Sub-header Navigation Bar */}
                <div className="border-b border-gray-200 bg-white pt-24 pb-6">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                {/* Breadcrumb */}
                                <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
                                    <Link href="/" className="hover:text-[#FDC02F]">HOME</Link>
                                    <span>/</span>
                                    <Link href="/services" className="hover:text-[#FDC02F]">SERVICES</Link>
                                    <span>/</span>
                                    <span className="text-[#FDC02F]">{categoryData.title}</span>
                                </div>
                                <h1 className="text-3xl font-extrabold text-[#0B1B32]">
                                    {categoryData.title}
                                </h1>
                                <p className="mt-1 text-xs text-gray-500 max-w-2xl">
                                    {categoryData.description}
                                </p>
                            </div>

                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-xs font-bold text-[#0B1B32] shadow-sm transition-all hover:bg-gray-50 hover:border-gray-400"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                                BACK TO ALL SERVICES
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Interactive Content */}
                <main className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                        {/* LEFT SIDEBAR: Sub-services Navigation */}
                        <div className="lg:col-span-4">
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sticky top-28">
                                <h2 className="mb-4 text-xs font-extrabold tracking-widest text-[#0B1B32] uppercase">
                                    OUR SERVICES
                                </h2>

                                <div className="space-y-2">
    {categoryData.items.map((item) => {
        const ItemIcon = item.icon || IconWrench;
        const isSelected = selectedItem.id === item.id;

        return (
            <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-xs font-bold transition-all duration-300 ease-in-out cursor-pointer ${
                    isSelected
                        ? 'bg-amber-50 text-[#0B1B32] border-l-4 border-[#FDC02F] shadow-sm'
                        : 'bg-transparent border border-transparent text-gray-600 hover:bg-white hover:border-amber-400 hover:text-amber-600 hover:shadow-md hover:-translate-y-0.5'
                }`}
            >
                <div className="flex items-center gap-3">
                    <span
                        className={`grid h-8 w-8 place-items-center rounded-lg transition-all duration-300 ${
                            isSelected
                                ? 'bg-[#FDC02F] text-[#0B1B32]'
                                : 'bg-gray-100 text-gray-500 group-hover:bg-[#FDC02F] group-hover:text-[#0B1B32] group-hover:scale-110'
                        }`}
                    >
                        <ItemIcon className="h-4 w-4" />
                    </span>
                    <span className="transition-colors duration-300 group-hover:text-amber-600">
                        {item.name}
                    </span>
                </div>

                <IconChevronRight
                    className={`h-4 w-4 transition-all duration-300 ${
                        isSelected
                            ? 'text-[#0B1B32] translate-x-0.5'
                            : 'text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1'
                    }`}
                />
            </button>
        );
    })}
</div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT AREA: Selected Sub-service Detail */}
                        <div className="space-y-8 lg:col-span-8">
                            
                            {/* TOP CARD: Overview & SPI Technician Image */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
                                    <div className="lg:col-span-7">
                                        <span className="text-xl font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-lg inline-block">
                                            {selectedItem.num}
                                        </span>
                                        <h2 className="mt-4 text-2xl font-extrabold text-[#0B1B32]">
                                            {selectedItem.name}
                                        </h2>
                                        <p className="mt-3 text-xs leading-relaxed text-gray-500">
                                            {selectedItem.description}
                                        </p>
                                        <span className="mt-6 block h-0.5 w-12 rounded-full bg-[#FDC02F]" />
                                    </div>

                                    {/* SPI Field Technician Image */}
                                    <div className="lg:col-span-5">
                                        <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md">
                                            <img
                                                src="/images/choose.jpg"
                                                alt="SPI Technician inspects heavy equipment"
                                                className="h-56 w-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop';
                                                }}
                                            />
                                            <div className="absolute bottom-2 right-2 rounded bg-[#0B1B32]/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                                SPI CERTIFIED
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4 Feature Steps/Process */}
                                {selectedItem.steps && (
                                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-gray-100 pt-8">
                                        {selectedItem.steps.map((st, i) => (
                                            <div key={i} className="rounded-xl bg-slate-50/80 p-4 border border-slate-100">
                                                <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-600 mb-3">
                                                    <IconWrench className="h-4 w-4" />
                                                </span>
                                                <h4 className="text-xs font-bold text-[#0B1B32]">{st.title}</h4>
                                                <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{st.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* BOTTOM GRID: What We Do & Key Benefits */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                
                                {/* What We Do */}
                                <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-500">
                                            <IconClipboard className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-base font-extrabold text-[#0B1B32]">What We Do</h3>
                                            <p className="text-[11px] text-gray-400">Comprehensive scope of work</p>
                                        </div>
                                    </div>

                                    <ul className="mt-6 space-y-3">
                                        {selectedItem.whatWeDo?.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                                                <IconCheckCircle className="h-4 w-4 shrink-0 text-[#FDC02F] mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Key Benefits */}
                                <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-500">
                                            <IconShield className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-base font-extrabold text-[#0B1B32]">Key Benefits</h3>
                                            <p className="text-[11px] text-gray-400">Why choose this service</p>
                                        </div>
                                    </div>

                                    <ul className="mt-6 space-y-3">
                                        {selectedItem.benefits?.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                                                <IconCheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* CALL TO ACTION BANNER */}
                            <div className="rounded-2xl bg-[#0B1B32] p-8 shadow-lg text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#FDC02F]/50 text-[#FDC02F]">
                                        <IconHeadset className="h-6 w-6" />
                                    </span>
                                    <div>
                                        <h3 className="text-base font-extrabold text-white">
                                            Need {selectedItem.name} Support?
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-300">
                                            Our technical team is ready to help you maintain your equipment reliability.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex w-full sm:w-auto items-center gap-3 shrink-0">
                                    <Link
                                        href="/contact"
                                        className="flex-1 sm:flex-initial text-center rounded-xl bg-[#FDC02F] px-5 py-3 text-xs font-bold text-[#0B1B32] hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                                    >
                                        REQUEST SERVICE
                                        <IconArrowRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="flex-1 sm:flex-initial text-center rounded-xl border border-white/30 px-5 py-3 text-xs font-bold text-white hover:border-[#FDC02F] hover:text-[#FDC02F] transition-colors flex items-center justify-center gap-2"
                                    >
                                        TALK TO OUR EXPERT
                                        <IconArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}