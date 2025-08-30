document.addEventListener('DOMContentLoaded', () => {
    // --- COMMON ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    const currentYearEl = document.getElementById('current-year');
    if(currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    // --- TYPEWRITER EFFECT FOR HOME PAGE ---
    const typeEffectSpan = document.querySelector('.type-effect');
    if (typeEffectSpan) {
        const words = ["Interactively.", "Visually.", "Simply."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeEffectSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeEffectSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            const typeSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typeSpeed);
        }
        type();
    }
    
    // --- GUIDES PAGE LOGIC ---
    if (document.querySelector('#arcgis-task-list') || document.querySelector('#qgis-task-list')) {
        const ICONS = {
            data: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H6a2 2 0 00-2 2z" /></svg>`,
            process: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg>`,
            action: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>`,
            output: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
            advanced: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>`
        };

        const arcgisTasks = [
            {
                key: 'watershed',
                title: 'Watershed Delineation',
                description: 'An interactive guide to delineating catchment areas from a Digital Elevation Model (DEM).',
                icon: ICONS.process,
                color: 'indigo'
            }
        ];
        
        const qgisTasks = [
            {
                key: 'watershed',
                title: 'Watershed Delineation',
                description: 'An interactive guide to delineating catchment areas using tools from the SAGA toolbox.',
                icon: ICONS.process,
                color: 'green'
            }
        ];

        const allData = {
            arcgis: {
                watershed: [
                    { id: 1, title: 'Add DEM Data', icon: 'data', color: 'from-green-400 to-blue-500', quick: 'Add DEM to map.', 
                      description: 'The first step is to add your DEM data (e.g., a 30m SRTM GeoTIFF) to ArcGIS Pro. This can be done by simply dragging the file into the map view.',
                      extras: [
                        { type: 'protip', title: 'Pro Tip:', content: 'Right-click the DEM layer and go to <strong>Symbology</strong> to apply a color scheme. This helps to visually identify high elevation areas (hills) and low elevation areas (valleys) before you begin the analysis.' }
                      ]
                    },
                    { id: 2, title: 'Fill Sinks', icon: 'process', color: 'from-blue-500 to-cyan-500', quick: 'Tool: Fill', 
                      description: 'This process corrects imperfections in the DEM to create a "hydrologically correct" surface, which is essential for accurate flow modeling.',
                      extras: [
                        { type: 'params', title: 'Tool Parameters:', content: '<strong>Tool:</strong> Fill<br><strong>Location:</strong> <code>Geoprocessing > Spatial Analyst Tools > Hydrology > Fill</code><br><strong>Input:</strong> Your original DEM raster.<br><strong>Output:</strong> A new "Filled" DEM raster (.tif).' }
                      ]
                    },
                    { id: 3, title: 'Flow Direction', icon: 'process', color: 'from-cyan-500 to-teal-500', quick: 'Tool: Flow Direction',
                      description: 'This tool creates a raster that shows the direction water will flow from each cell to its steepest downslope neighbor.',
                      extras: [
                        { type: 'params', title: 'Tool Parameters:', content: '<strong>Tool:</strong> Flow Direction<br><strong>Location:</strong> <code>Geoprocessing > Spatial Analyst Tools > Hydrology > Flow Direction</code><br><strong>Input:</strong> Your "Filled" DEM from the previous step.<br><strong>Flow Direction Type:</strong> Use the default <strong>D8</strong> method.'}
                      ]
                    },
                    { id: 4, title: 'Flow Accumulation', icon: 'process', color: 'from-teal-500 to-emerald-500', quick: 'Tool: Flow Accumulation',
                      description: 'This tool calculates how many upstream cells flow into each cell, highlighting stream channels.',
                      extras: [
                        { type: 'params', title: 'Tool Parameters:', content: '<strong>Tool:</strong> Flow Accumulation<br><strong>Location:</strong> <code>Geoprocessing > Spatial Analyst Tools > Hydrology > Flow Accumulation</code><br><strong>Input:</strong> Your "Flow Direction" raster.' },
                        { type: 'protip', title: 'Pro Tip (Visualization):', content: 'To better see the river network, right-click the new layer > <strong>Symbology</strong>. Change the type to <strong>Classify</strong> with 2 classes. Lower the "upper value" of the first class (e.g., to 100,000) to reveal more tributaries.' }
                      ]
                    },
                    { id: 5, title: 'Create Outlet Points', icon: 'action', color: 'from-emerald-500 to-lime-500', quick: 'Action: Create Point',
                      description: 'You must manually define the specific point (or "pour point") for your watershed.',
                      extras: [
                          { type: 'params', title: 'Actions:', content: '<strong>1. Create Feature Class:</strong> In the <strong>Catalog</strong> pane, right-click your project folder > <code>New > Shapefile</code>. Set Geometry Type to "Point".<br><strong>2. Add Point:</strong> Go to the <strong>Edit</strong> tab and click <strong>Create</strong>. Select your new shapefile and place a point on a high-flow-accumulation cell (a white line on your Flow Accumulation raster).<br><strong>3. Save Edits:</strong> Crucially, click <strong>Save</strong> in the Edit tab to finalize the point creation.' }
                      ]
                    },
                    { id: 6, title: 'Delineate Watershed', icon: 'output', color: 'from-lime-500 to-yellow-500', quick: 'Tool: Watershed',
                      description: 'This is the final step that generates the watershed boundary based on your flow direction and outlet point.',
                      extras: [
                          { type: 'params', title: 'Tool Parameters:', content: '<strong>Tool:</strong> Watershed<br><strong>Location:</strong> <code>Geoprocessing > Spatial Analyst Tools > Hydrology > Watershed</code><br><strong>Input Flow Direction Raster:</strong> Your "Flow Direction" raster.<br><strong>Input Point Data:</strong> Your outlet point shapefile.'}
                      ]
                    },
                    { id: 7, title: 'Optional Advanced Steps', icon: 'advanced', color: 'from-yellow-500 to-amber-500', quick: 'Convert & Generate Rivers',
                      description: 'These steps convert your raster results into more usable vector formats.',
                      extras: [
                        { type: 'params', title: 'Convert Watershed to Polygon:', content: '<strong>Tool:</strong> Raster to Polygon<br><strong>Location:</strong> <code>Conversion Tools > From Raster</code><br>This is useful for calculating the watershed area.' },
                        { type: 'params', title: 'Generate River Lines:', content: '<strong>1. Reclassify:</strong> Use the <strong>Reclassify</strong> tool on your Flow Accumulation raster to isolate high-value cells (the streams).<br><strong>2. Raster to Polyline:</strong> Use this tool to convert the reclassified stream raster into a line feature.<br><strong>3. Clip:</strong> Use the <strong>Clip</strong> tool to trim the river lines to your watershed boundary polygon.'}
                      ]
                    }
                ]
            },
            qgis: {
                 watershed: [
                    { id: 1, title: 'DEM Download', icon: 'data', color: 'from-lime-500 to-green-500', quick: 'Download from OpenTopography or USGS.', 
                      description: 'To obtain the primary data source, a Digital Elevation Model (DEM), which is a raster representation of a continuous surface where each cell value represents an elevation. The quality of your watershed analysis depends heavily on the resolution and accuracy of your DEM.',
                      extras: [
                        { type: 'protip', title: 'Recommended Sources:', content: '<strong>Opentopography:</strong> A web-based data portal that provides access to high-resolution topography data.<br><strong>USGS EarthExplorer:</strong> Provides a vast collection of geospatial data, including the widely-used SRTM DEM.' }
                      ]
                    },
                    { id: 2, title: 'Project the DEM', icon: 'process', color: 'from-green-500 to-emerald-500', quick: 'Use Warp (Reproject) tool.',
                      description: 'Raw DEMs often come in a geographic CRS (like WGS84), where units are in degrees. For calculations involving distance and area, it is crucial to reproject the DEM to a projected CRS (like a UTM Zone), where units are in meters.',
                      extras: [
                        { type: 'params', title: 'Tool:', content: 'In QGIS, this can be done using the <strong>Warp (Reproject)</strong> tool found in the <code>Raster > Projections</code> menu.' }
                      ]
                    },
                    { id: 3, title: 'Fill Sinks', icon: 'process', color: 'from-emerald-500 to-teal-500', quick: 'Tool: Fill Sinks (Wang & Liu)',
                      description: 'This step pre-processes the DEM by removing "sinks" or depressions, which can artificially trap water flow and lead to incorrect watershed delineation. The Wang & Liu algorithm is a highly efficient method for this.',
                      extras: [
                        { type: 'params', title: 'Tool Parameters:', content: '<strong>Tool:</strong> Fill Sinks (Wang & Liu)<br><strong>Location:</strong> <code>Processing Toolbox > SAGA > Terrain Analysis - Hydrology</code><br><strong>Input (DEM):</strong> Your projected DEM raster.<br><strong>Outputs:</strong> The primary output is the "Filled DEM". This tool can also generate Flow Direction
